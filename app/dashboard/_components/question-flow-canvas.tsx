"use client";

import "reactflow/dist/style.css";

import { Flag, Trash2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  Handle,
  MarkerType,
  Panel,
  Position,
  ReactFlowProvider,
  applyNodeChanges,
  type Edge,
  type Node,
  type NodeChange,
  type NodeProps,
} from "reactflow";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { Question } from "./types";

const NODE_WIDTH = 300;
const COLUMN_GAP = 160;
const ROW_HEIGHT = 280;
const END_NODE_ID = "flow-end";

type QuestionNodeData = {
  question: Question;
  onPromptChange: (value: string) => void;
  onDelete: () => void;
};

/**
 * A question card: the prompt is editable, and every answer carries its own
 * outgoing handle so the wire shows exactly where that answer routes.
 */
function QuestionNode({ data }: NodeProps<QuestionNodeData>) {
  const { question, onPromptChange, onDelete } = data;
  const fieldId = `prompt-${question.id}`;

  return (
    <div
      style={{ width: NODE_WIDTH }}
      className="rounded-xl border bg-card p-4 shadow-sm"
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!size-2.5 !border-2 !border-background !bg-muted-foreground"
      />

      <div className="flex items-start justify-between gap-2">
        <Label htmlFor={fieldId}>
          Question
          <span className="text-xs font-normal text-muted-foreground">
            {question.answers.length} answers
          </span>
        </Label>
        <Button
          variant="ghost"
          size="icon-xs"
          aria-label={`Delete question: ${question.prompt}`}
          onClick={onDelete}
          className="nodrag -mt-1 -mr-1.5 shrink-0 text-muted-foreground hover:text-destructive"
        >
          <Trash2 aria-hidden />
        </Button>
      </div>

      <div className="nodrag mt-2">
        <Input
          id={fieldId}
          value={question.prompt}
          onChange={(event) => onPromptChange(event.target.value)}
        />
      </div>

      <div className="mt-3 flex flex-col gap-2">
        {question.answers.map((answer) => (
          <div
            key={answer.id}
            className="relative flex items-center justify-between gap-2 rounded-lg border bg-background px-3 py-2 text-sm"
          >
            <span className="truncate">{answer.label}</span>
            {answer.nextId === null && (
              <span className="shrink-0 text-xs text-muted-foreground">
                to end
              </span>
            )}
            <Handle
              id={answer.id}
              type="source"
              position={Position.Right}
              className="!top-1/2 !-right-[22px] !size-2.5 !-translate-y-1/2 !border-2 !border-background !bg-muted-foreground"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Where every branch eventually lands, however many steps it skipped. */
function EndNode() {
  return (
    <div className="flex w-56 items-center gap-3 rounded-xl border bg-foreground p-4 text-background shadow-sm">
      <Handle
        type="target"
        position={Position.Left}
        className="!size-2.5 !border-2 !border-background !bg-muted-foreground"
      />
      <Flag className="size-5 shrink-0" />
      <div className="min-w-0">
        <p className="truncate text-sm font-medium">End of flow</p>
        <p className="truncate text-xs text-background/60">
          Book a consultation
        </p>
      </div>
    </div>
  );
}

const nodeTypes = { question: QuestionNode, end: EndNode };

/**
 * Column per question, breadth-first from the root — an answer that lands more
 * than one column ahead is rendered as a "skips ahead" edge.
 */
function computeLevels(questions: Question[]) {
  const levels = new Map<string, number>();
  if (questions.length === 0) return levels;

  const byId = new Map(questions.map((question) => [question.id, question]));
  const queue = [{ id: questions[0].id, level: 0 }];

  while (queue.length > 0) {
    const { id, level } = queue.shift()!;
    if (levels.has(id)) continue;
    levels.set(id, level);
    byId.get(id)?.answers.forEach((answer) => {
      if (answer.nextId && byId.has(answer.nextId)) {
        queue.push({ id: answer.nextId, level: level + 1 });
      }
    });
  }

  // Questions nothing routes to yet still get a column at the start.
  questions.forEach((question) => {
    if (!levels.has(question.id)) levels.set(question.id, 0);
  });

  return levels;
}

type QuestionFlowCanvasProps = {
  initialQuestions: Question[];
  /** Mirrors current questions up for display (count) — not the source of truth. */
  onQuestionsChange: (questions: Question[]) => void;
};

export function QuestionFlowCanvas({
  initialQuestions,
  onQuestionsChange,
}: QuestionFlowCanvasProps) {
  // Node data closures are created once (below) but need to call whatever the
  // *latest* handler is — these refs sidestep the chicken-and-egg problem of
  // the node list needing handlers that themselves need setNodes.
  const onPromptChangeRef = useRef<(id: string, value: string) => void>(
    () => {}
  );
  const onDeleteRef = useRef<(id: string) => void>(() => {});

  // Question awaiting delete confirmation — the trash button only stages it here.
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const [nodes, setNodes] = useState<Node[]>(() => {
    const levels = computeLevels(initialQuestions);
    const maxLevel = Math.max(0, ...levels.values());
    const rowIndexByLevel = new Map<number, number>();

    const questionNodes = initialQuestions.map((question) => {
      const level = levels.get(question.id) ?? 0;
      const row = rowIndexByLevel.get(level) ?? 0;
      rowIndexByLevel.set(level, row + 1);
      return {
        id: question.id,
        type: "question",
        position: {
          x: 40 + level * (NODE_WIDTH + COLUMN_GAP),
          y: 40 + row * ROW_HEIGHT,
        },
        style: { width: NODE_WIDTH },
        data: {
          question,
          onPromptChange: (value: string) =>
            onPromptChangeRef.current(question.id, value),
          onDelete: () => onDeleteRef.current(question.id),
        },
      };
    });

    return [
      ...questionNodes,
      {
        id: END_NODE_ID,
        type: "end",
        position: {
          x: 40 + (maxLevel + 1) * (NODE_WIDTH + COLUMN_GAP),
          y: 40 + ROW_HEIGHT / 2,
        },
        data: {},
        draggable: true,
      },
    ];
  });

  const questions = useMemo(
    () =>
      nodes
        .filter((node): node is Node<QuestionNodeData> => node.type === "question")
        .map((node) => node.data.question),
    [nodes]
  );

  // Mirror question data up to the parent after render — calling setState on
  // the parent from inside a setNodes updater would update it mid-render.
  useEffect(() => {
    onQuestionsChange(questions);
  }, [questions, onQuestionsChange]);

  const handlePromptChange = useCallback((id: string, value: string) => {
    setNodes((current) =>
      current.map((node) =>
        node.type === "question" && node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                question: { ...node.data.question, prompt: value },
              },
            }
          : node
      )
    );
  }, []);

  useEffect(() => {
    onPromptChangeRef.current = handlePromptChange;
  }, [handlePromptChange]);

  const handleDeleteQuestion = useCallback((id: string) => {
    setNodes((current) =>
      current
        .filter((node) => node.id !== id)
        .map((node) =>
          node.type === "question"
            ? {
                ...node,
                data: {
                  ...node.data,
                  question: {
                    ...node.data.question,
                    // Answers that routed here now go straight to the end.
                    answers: node.data.question.answers.map(
                      (answer: Question["answers"][number]) =>
                        answer.nextId === id
                          ? { ...answer, nextId: null }
                          : answer
                    ),
                  },
                },
              }
            : node
        )
    );
  }, []);

  useEffect(() => {
    onDeleteRef.current = setPendingDeleteId;
  }, []);

  const confirmDelete = useCallback(() => {
    if (pendingDeleteId) handleDeleteQuestion(pendingDeleteId);
    setPendingDeleteId(null);
  }, [pendingDeleteId, handleDeleteQuestion]);

  const handleNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes((current) => applyNodeChanges(changes, current));
  }, []);

  const handleAddQuestion = useCallback(() => {
    setNodes((current) => {
      const questionCount = current.filter(
        (node) => node.type === "question"
      ).length;
      const question: Question = {
        id: crypto.randomUUID(),
        prompt: "New question",
        answers: [
          { id: crypto.randomUUID(), label: "Answer A", nextId: null },
          { id: crypto.randomUUID(), label: "Answer B", nextId: null },
        ],
      };
      const newNode: Node<QuestionNodeData> = {
        id: question.id,
        type: "question",
        position: { x: 40, y: 40 + questionCount * ROW_HEIGHT },
        style: { width: NODE_WIDTH },
        data: {
          question,
          onPromptChange: (value: string) =>
            onPromptChangeRef.current(question.id, value),
          onDelete: () => onDeleteRef.current(question.id),
        },
      };
      // Insert before the end node so the end card stays last/on top.
      return [...current.slice(0, -1), newNode, current[current.length - 1]];
    });
  }, []);

  // One edge per answer: solid to the next column, dashed + labeled when the
  // answer jumps past intermediate questions (or straight to the end).
  const edges = useMemo<Edge[]>(() => {
    const levels = computeLevels(questions);
    const questionIds = new Set(questions.map((question) => question.id));
    const endLevel = Math.max(0, ...levels.values()) + 1;

    return questions.flatMap((question) =>
      question.answers.map((answer) => {
        const target =
          answer.nextId && questionIds.has(answer.nextId)
            ? answer.nextId
            : END_NODE_ID;
        const sourceLevel = levels.get(question.id) ?? 0;
        const targetLevel =
          target === END_NODE_ID ? endLevel : (levels.get(target) ?? 0);
        const skips = targetLevel - sourceLevel > 1;
        const stroke = skips ? "var(--primary)" : "var(--muted-foreground)";

        return {
          id: `route-${question.id}-${answer.id}`,
          source: question.id,
          sourceHandle: answer.id,
          target,
          type: "smoothstep",
          animated: true,
          label: skips ? "skips ahead" : undefined,
          labelStyle: { fill: "var(--primary)", fontSize: 10 },
          labelBgStyle: { fill: "var(--background)" },
          style: {
            stroke,
            strokeWidth: 1.5,
            strokeDasharray: skips ? "6 4" : undefined,
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: stroke,
            width: 16,
            height: 16,
          },
        };
      })
    );
  }, [questions]);

  const pendingDeleteNode = nodes.find(
    (node) => node.type === "question" && node.id === pendingDeleteId
  );

  return (
    <ReactFlowProvider>
      {/* absolute-fill instead of h-full: sidesteps flex/percentage-height
          resolution timing issues that leave React Flow measuring 0×0. */}
      <div className="absolute inset-0">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={handleNodesChange}
          nodesConnectable={false}
          deleteKeyCode={null}
          fitView
          fitViewOptions={{ padding: 0.15, maxZoom: 1 }}
          minZoom={0.4}
          proOptions={{ hideAttribution: true }}
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={20}
            size={2}
            color="#a1a1aa"
          />
          <Controls showInteractive={false} />
          <Panel position="top-right">
            <Button variant="outline" size="sm" onClick={handleAddQuestion}>
              Add question
            </Button>
          </Panel>
        </ReactFlow>
      </div>

      <Dialog
        open={pendingDeleteId !== null}
        onOpenChange={(open) => {
          if (!open) setPendingDeleteId(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete question?</DialogTitle>
            <DialogDescription>
              {pendingDeleteNode
                ? `"${pendingDeleteNode.data.question.prompt}" will be removed`
                : "This question will be removed"}{" "}
              from the flow. Answers that route here will go straight to the
              end instead. This can&apos;t be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>
              Cancel
            </DialogClose>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete question
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ReactFlowProvider>
  );
}

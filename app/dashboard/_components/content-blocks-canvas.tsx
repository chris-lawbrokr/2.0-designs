"use client";

import "reactflow/dist/style.css";

import { Globe } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import type { ContentBlock } from "./types";

type BlockNodeData = {
  block: ContentBlock;
  onChange: (value: string) => void;
};

type PageNodeData = {
  label: string;
  blockCount: number;
};

const NODE_WIDTH = 320;
const ROW_HEIGHT = 200;
const PAGE_NODE_ID = "page-output";

function defaultPosition(index: number) {
  return { x: 40, y: 40 + index * ROW_HEIGHT };
}

/** A content block rendered as a draggable card — the "nodrag" wrapper keeps the field editable without starting a drag. */
function BlockNode({ data }: NodeProps<BlockNodeData>) {
  const { block, onChange } = data;
  const fieldId = `block-${block.id}`;

  return (
    <div
      style={{ width: NODE_WIDTH }}
      className="rounded-xl border bg-card p-4 shadow-sm"
    >
      <Handle
        type="source"
        position={Position.Right}
        className="!size-2.5 !border-2 !border-background !bg-muted-foreground"
      />

      <Label htmlFor={fieldId} className="flex items-center gap-2">
        {block.label}
        <span className="text-xs font-normal text-muted-foreground">
          {block.type}
        </span>
      </Label>

      <div className="nodrag mt-2">
        {block.type === "text" ? (
          <Textarea
            id={fieldId}
            rows={4}
            value={block.value}
            onChange={(event) => onChange(event.target.value)}
          />
        ) : (
          <Input
            id={fieldId}
            value={block.value}
            onChange={(event) => onChange(event.target.value)}
          />
        )}
      </div>
    </div>
  );
}

/** Where every block's wire leads — the assembled, published page. */
function PageNode({ data }: NodeProps<PageNodeData>) {
  return (
    <div className="flex w-56 items-center gap-3 rounded-xl border bg-foreground p-4 text-background shadow-sm">
      <Handle
        type="target"
        position={Position.Left}
        className="!size-2.5 !border-2 !border-background !bg-muted-foreground"
      />
      <Globe className="size-5 shrink-0" />
      <div className="min-w-0">
        <p className="truncate text-sm font-medium">{data.label}</p>
        <p className="truncate text-xs text-background/60">
          {data.blockCount} blocks combined
        </p>
      </div>
    </div>
  );
}

const nodeTypes = { block: BlockNode, page: PageNode };

type ContentBlocksCanvasProps = {
  pageLabel: string;
  initialBlocks: ContentBlock[];
  /** Mirrors current block content up for display (block count) — not the source of truth. */
  onBlocksChange: (blocks: ContentBlock[]) => void;
};

function pageNodePosition(blockCount: number) {
  return {
    x: 40 + NODE_WIDTH + 160,
    y: 40 + ((Math.max(blockCount, 1) - 1) * ROW_HEIGHT) / 2,
  };
}

export function ContentBlocksCanvas({
  pageLabel,
  initialBlocks,
  onBlocksChange,
}: ContentBlocksCanvasProps) {
  // Node data closures are created once (below) but need to call whatever the
  // *latest* value-change handler is — this ref sidesteps the chicken-and-egg
  // problem of the node list needing a handler that itself needs setNodes.
  const onValueChangeRef = useRef<(id: string, value: string) => void>(
    () => {}
  );

  const [nodes, setNodes] = useState<Node[]>(() => [
    ...initialBlocks.map((block, index) => ({
      id: block.id,
      type: "block",
      position: defaultPosition(index),
      style: { width: NODE_WIDTH },
      data: {
        block,
        onChange: (value: string) => onValueChangeRef.current(block.id, value),
      },
    })),
    {
      id: PAGE_NODE_ID,
      type: "page",
      position: pageNodePosition(initialBlocks.length),
      data: { label: pageLabel, blockCount: initialBlocks.length },
      draggable: true,
    },
  ]);

  const emitBlocks = useCallback(
    (current: Node[]) =>
      onBlocksChange(
        current
          .filter((node): node is Node<BlockNodeData> => node.type === "block")
          .map((node) => node.data.block)
      ),
    [onBlocksChange]
  );

  const handleValueChange = useCallback(
    (id: string, value: string) => {
      setNodes((current) => {
        const next = current.map((node) =>
          node.type === "block" && node.id === id
            ? {
                ...node,
                data: {
                  ...node.data,
                  block: { ...node.data.block, value },
                },
              }
            : node
        );
        emitBlocks(next);
        return next;
      });
    },
    [emitBlocks]
  );

  useEffect(() => {
    onValueChangeRef.current = handleValueChange;
  }, [handleValueChange]);

  const handleNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes((current) => applyNodeChanges(changes, current));
  }, []);

  const handleAddBlock = useCallback(() => {
    setNodes((current) => {
      const blockNodes = current.filter((node) => node.type === "block");
      const block: ContentBlock = {
        id: crypto.randomUUID(),
        label: "New block",
        type: "text",
        value: "",
      };
      const newNode: Node<BlockNodeData> = {
        id: block.id,
        type: "block",
        position: defaultPosition(blockNodes.length),
        style: { width: NODE_WIDTH },
        data: {
          block,
          onChange: (value: string) => onValueChangeRef.current(block.id, value),
        },
      };
      // Insert before the page node so the page card stays last/on top.
      const pageNode = current[current.length - 1];
      const updatedPageNode = {
        ...pageNode,
        data: { ...pageNode.data, blockCount: blockNodes.length + 1 },
      };
      const next = [...current.slice(0, -1), newNode, updatedPageNode];
      emitBlocks(next);
      return next;
    });
  }, [emitBlocks]);

  const edges = useMemo<Edge[]>(
    () =>
      nodes
        .filter((node) => node.type === "block")
        .map((node) => ({
          id: `wire-${node.id}`,
          source: node.id,
          target: PAGE_NODE_ID,
          type: "smoothstep",
          animated: true,
          style: { stroke: "var(--muted-foreground)", strokeWidth: 1.5 },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: "var(--muted-foreground)",
            width: 16,
            height: 16,
          },
        })),
    [nodes]
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
          defaultViewport={{ x: 40, y: 40, zoom: 1 }}
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
            <Button variant="outline" size="sm" onClick={handleAddBlock}>
              Add block
            </Button>
          </Panel>
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
}

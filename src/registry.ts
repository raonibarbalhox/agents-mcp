import { AGENTS, type AgentDef, type AgentTier } from "./agents.js";

export type { AgentDef, AgentTier };

export function listAgents(): AgentDef[] {
  return AGENTS;
}

export function listApiAgents(): AgentDef[] {
  return AGENTS.filter((a) => a.apiExposed);
}

export function agentsByTier(tier: AgentTier): AgentDef[] {
  return AGENTS.filter((a) => a.tier === tier);
}

export function getAgentById(id: string): AgentDef | undefined {
  return AGENTS.find((a) => a.id === id);
}

export function getAgentBySlug(publicSlug: string): AgentDef | undefined {
  return AGENTS.find((a) => a.publicSlug === publicSlug);
}

export function getAgentByToolName(toolName: string): AgentDef | undefined {
  return AGENTS.find((a) => a.toolName === toolName);
}

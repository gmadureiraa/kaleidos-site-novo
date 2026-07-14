/** Evento compartilhado: abrir o modal do playbook (sticky / CTAs / lead-popup). */
export const OPEN_PLAYBOOK_EVENT = "open-playbook-popup";

/**
 * Hierarquia de chaves localStorage (popups / gates):
 *
 * | Key | Escopo | Efeito |
 * |-----|--------|--------|
 * | `kld_papers_unlocked` | Global | Qualquer paper/gate liberado — não pedir email de novo |
 * | `kld_playbook_v2_dismissed_at` | Playbook modal | Dismiss do EbookPopup via playbook (14 dias) |
 * | `kld_playbook_v2_seen_session` | Playbook auto | 1x/sessão se AUTO_TRIGGER on |
 * | `kld_playbook_sticky_dismissed_at` | Sticky card | Some o card fixo da home |
 * | `kld_popup_dismissed_at` | LeadPopup | Dismiss do lead genérico (14 dias) |
 * | `kld_popup_subscribed` | LeadPopup | Assinou via lead genérico |
 * | `kld_popup_seen_session` | LeadPopup | 1x/sessão no lead |
 *
 * Unlock (`kld_papers_unlocked=1`) tem prioridade máxima sobre dismiss.
 */
export const PLAYBOOK_STORAGE = {
  unlocked: "kld_papers_unlocked",
  playbookDismissed: "kld_playbook_v2_dismissed_at",
  playbookSession: "kld_playbook_v2_seen_session",
  stickyDismissed: "kld_playbook_sticky_dismissed_at",
  leadDismissed: "kld_popup_dismissed_at",
  leadSubscribed: "kld_popup_subscribed",
  leadSession: "kld_popup_seen_session",
} as const;

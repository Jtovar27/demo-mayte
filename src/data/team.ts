/**
 * TEAM DATA — Canonical list of team members available for preferred-advisor selection.
 *
 * Used by:
 *   - src/app/contact/page.tsx (preferred team-member dropdown in the contact form)
 *
 * To add a team member:
 *   1. Add an entry here with a unique id, nameKey, and roleKey.
 *   2. Add the corresponding nameKey and roleKey translations to src/context/LanguageContext.tsx.
 *   3. The member will automatically appear in the contact form dropdown.
 *
 * This structure is designed to be admin-manageable in a future phase.
 * Keep id values stable — they will be used as form values sent to the backend.
 */

export interface TeamMember {
  id: string;
  nameKey: string;
  roleKey: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: "mayte",
    nameKey: "team.mayte.name",
    roleKey: "team.mayte.role",
  },
];

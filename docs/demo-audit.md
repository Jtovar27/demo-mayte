cat > docs/demo-audit.md <<'EOF'
# Demo Audit — Current State

## Reviewed URL
https://demo-mayte.vercel.app/

## Confirmed Existing Structure
- Navigation includes: Inicio, Nosotros, Servicios, Blog, FAQ, Contacto
- Services page already exists
- Current service categories include:
  - Impuestos
  - Seguros
  - Notaría y Documentos
  - Negocios y Crédito

## Confirmed Existing Service Content
### Impuestos
- Impuestos Personales
- Impuestos Empresariales

### Seguros
- Seguros de Salud (Obamacare / ACA)
- Seguros de Vida y Medicare

### Notaría y Documentos
- Notario Público
- Apostillas
- Poderes Notariales
- Fe de Vida
- Traducciones Certificadas

### Negocios y Crédito
- Registro de Empresa / Perfil Empresarial
- Establecimiento de Crédito Empresarial
- Préstamos de Corto y Largo Plazo

## Confirmed Good Existing Elements
- Local business framing
- Spanish-first service structure
- Existing legal/admin disclaimer:
  "No somos abogados. Solo preparamos documentos y ayudamos con trámites administrativos."

## Confirmed Problems
- Legacy email still appears in footer/contact section
- Services structure needs refinement and expansion
- Taxes To Go page/flow is not clearly present from this reviewed page
- Google reviews system is not clearly integrated
- Credit repair is not clearly presented as a dedicated service
- Admin editability is not evident
- Team-member selection in forms is not evident
- Chatbot behavior/rules are not evident

## Required Additions Based On Updated Scope
- Add immigration document processing under Notary & Documents
- Add strict non-legal disclaimer for immigration-related items
- Add dedicated Taxes To Go page with process + CTA
- Add Credit Repair as explicit service
- Replace old email everywhere
- Add Google Reviews section + leave-review CTA
- Improve Business Creation explanation
- Add admin panel for content updates and uploads
- Add preferred team member selection in forms
- Add safe business chatbot with approved knowledge only

## Build Strategy Decision
This project should be treated as:
- refinement of an existing demo
- structured upgrade to production architecture
- reusable RuutDev service-business template

Not as a blind rebuild without auditing existing content.
EOF
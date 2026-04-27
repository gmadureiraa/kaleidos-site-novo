# 📊 Como Configurar o Evento WhatsApp no Google Analytics

## ✅ Status Atual

O código já está implementado! O evento `whatsapp_click` está sendo enviado automaticamente sempre que alguém clica em qualquer link/botão do WhatsApp no site.

## 🎯 Configuração no Google Analytics

### Opção 1: Criar com Código (RECOMENDADO)

1. **Acesse:** Google Analytics → Admin → Eventos → Criar evento
2. **Escolha:** "Criar com código"
3. **Nome do evento:** `whatsapp_click`
4. **Descrição:** "Rastreia cliques em links/botões do WhatsApp"
5. **Parâmetros que recebemos:**
   - `event_category`: "contact"
   - `event_label`: Localização do clique (ex: "cta_ajuda", "footer_contact")
   - `location`: Localização do clique
   - `context`: Contexto adicional (ex: "service_page", "services_2")
   - `value`: 1

6. **Marque como evento principal** (opcional, mas recomendado para conversões)

### Opção 2: Criar sem Código (Alternativa)

Se preferir usar "Criar sem código", você pode:

1. **Escolher:** "Criar sem código"
2. **Evento acionador:** `page_view`
3. **Condição:** URL contém `wa.me` (mas isso não vai funcionar bem porque o WhatsApp abre em nova aba)

**⚠️ Nota:** Esta opção não é recomendada porque o WhatsApp abre em nova aba, então o `page_view` não captura o clique corretamente.

## 📍 Locais Rastreados

O evento `whatsapp_click` é enviado automaticamente em:

1. **CTA Ajuda** (`cta_ajuda`) - Seção "Nós podemos te ajudar!"
2. **Footer Social** (`footer_social`) - Link do WhatsApp nos ícones sociais
3. **Footer Contato** (`footer_contact`) - Link do WhatsApp na seção de contato
4. **Página Contato** (`contato_page`) - Botão principal da página de contato
5. **Serviço Marketing** (`servico_marketing_conteudo`) - Página do serviço
6. **Serviço IA** (`servico_ia_automacoes`) - Página do serviço
7. **Serviço Growth** (`servico_growth_lancamentos`) - Página do serviço

## 🔍 Como Verificar se Está Funcionando

### 1. Google Analytics DebugView (Tempo Real)
- Acesse: Google Analytics → Relatórios → Tempo Real
- Clique em um link do WhatsApp no site
- O evento `whatsapp_click` deve aparecer em alguns segundos

### 2. Console do Navegador
- Abra o DevTools (F12)
- Vá na aba "Console"
- Digite: `window.gtag`
- Se retornar uma função, o GA está carregado
- Clique em um link do WhatsApp
- Verifique se o evento é enviado (pode verificar na aba Network também)

### 3. Google Tag Assistant
- Instale a extensão "Google Tag Assistant"
- Acesse o site
- Clique em um link do WhatsApp
- Verifique se o evento `whatsapp_click` aparece

## 📊 Relatórios no Google Analytics

Após configurar, você poderá ver:

- **Eventos → Todos os eventos:** Lista todos os eventos `whatsapp_click`
- **Eventos → Eventos principais:** Se marcou como principal, aparece aqui
- **Conversões:** Se configurou como conversão, aparece nas conversões

### Filtros Úteis:
- Por localização: `event_label` = "cta_ajuda"
- Por contexto: `context` = "service_page"
- Por serviço: `context` contém "servico_"

## 🎯 Próximos Passos

1. ✅ Código já implementado
2. ⏳ Criar evento no Google Analytics (usar "Criar com código")
3. ⏳ Marcar como evento principal (opcional)
4. ⏳ Testar clicando em um link do WhatsApp
5. ⏳ Verificar no DebugView se o evento aparece

## 💡 Dica

Se quiser criar um evento composto (ex: "WhatsApp - CTA Ajuda"), você pode criar eventos derivados no GA4 usando:
- Evento base: `whatsapp_click`
- Condição: `event_label` = "cta_ajuda"


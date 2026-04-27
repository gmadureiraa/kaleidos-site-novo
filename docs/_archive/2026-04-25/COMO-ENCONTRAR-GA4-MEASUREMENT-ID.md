# 🔍 Como Encontrar o Measurement ID do Google Analytics 4

## 📍 Passo a Passo Detalhado

### 1. Acesse o Google Analytics
- Vá para: https://analytics.google.com/
- Faça login com sua conta Google

### 2. Navegue até Admin
- No canto **inferior esquerdo**, clique no ícone de **engrenagem** (⚙️) ou em **"Administrador"**
- Você verá 3 colunas: Conta, Propriedade, Exibição

### 3. Selecione a Propriedade Correta
- Na coluna do **meio** ("Propriedade"), verifique se está selecionada a propriedade do site **kaleidos.com.br**
- Se não estiver, clique no dropdown e selecione a propriedade correta

### 4. Acesse "Fluxos de dados"
- Ainda na coluna **"Propriedade"** (meio), procure por **"Fluxos de dados"**
- Clique em **"Fluxos de dados"**

### 5. Escolha o Fluxo de Dados do Site
- Você verá uma lista de fluxos de dados
- Procure pelo fluxo que corresponde ao seu site (geralmente mostra o domínio, ex: "kaleidos.com.br")
- Clique no nome do fluxo de dados

### 6. Encontre o Measurement ID
- No **topo da página**, você verá:
  - **"ID da tag do Google"** ou **"Measurement ID"**
  - O formato será: **`G-XXXXXXXXXX`** (começa com G- seguido de letras/números)
- **Este é o ID que você precisa!**

## 📸 Onde Aparece

```
┌─────────────────────────────────────┐
│  Fluxo de dados: kaleidos.com.br   │
│                                     │
│  ID da tag do Google                │
│  G-XXXXXXXXXX  [📋 Copiar]         │
│                                     │
│  Nome do fluxo de dados            │
│  kaleidos.com.br                    │
└─────────────────────────────────────┘
```

## ✅ Formato Correto

- ✅ **Correto:** `G-ABC123XYZ` (começa com G-)
- ❌ **Errado:** `348885225` (só números, é o Account/Property ID)
- ❌ **Errado:** `UA-123456-1` (formato antigo Universal Analytics)

## 🔄 Alternativa: Via Admin Direto

Se não encontrar "Fluxos de dados", tente:

1. **Admin** → **Propriedade** → **Fluxos de dados**
2. Ou: **Admin** → **Propriedade** → **Configurações de dados** → **Fluxos de dados**

## 💡 Dica

Se você tem múltiplas propriedades:
- Verifique qual propriedade está associada ao domínio `kaleidos.com.br`
- O Measurement ID deve estar na mesma propriedade onde você vê os dados do site

## ⚠️ Importante

- O ID `348885225` que você mencionou é o **Account ID** ou **Property ID** (numérico)
- **NÃO é o Measurement ID** que precisamos
- O Measurement ID sempre começa com **`G-`**

## 📋 Depois de Encontrar

1. Copie o ID (formato `G-XXXXXXXXXX`)
2. Adicione no arquivo `.env.local`:
   ```
   NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
   ```
3. Reinicie o servidor local
4. Teste clicando em um link do WhatsApp e verifique no GA4 se o evento aparece


# 📱 EngemanX Mobile

> Sistema mobile para operações CIL (Cleaning, Inspection & Lubrication) em ambiente industrial

## 🎯 Sobre o Projeto

App React Native (Expo) para operadores executarem inspeções e manutenções CIL, integrado com sistema CMMS/EAM completo.

## 🚀 Funcionalidades

- ✅ Execução de rotas de inspeção CIL
- ✅ Checklists interativos com resultados OK/NOK/NA
- ✅ Registro de anomalias com fotos
- ✅ Pontos de lubrificação
- ✅ Integração Supabase/PostgreSQL
- ✅ Offline-first (em desenvolvimento)

## 🛠️ Stack Tecnológica

- **React Native** 0.76.5
- **Expo** ~52.0.11
- **TypeScript** 5.3.3
- **Supabase** (Backend)
- **React Navigation** 6.x
- **Zod** (Validação)
- **date-fns** (Datas)

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/JoaoPauloTeles/engemanx.git
cd engemanx

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas credenciais Supabase

# Inicie o servidor de desenvolvimento
npm start
```

## 🏃 Executar

```bash
npm start     # Expo Dev Server
npm run web   # Web browser
npm run ios   # iOS Simulator
npm run android # Android Emulator
```

## 📁 Estrutura do Projeto

```
src/
├── components/    # Componentes reutilizáveis
├── screens/       # Telas principais
├── services/      # APIs e Supabase
├── types/         # TypeScript types
├── utils/         # Funções auxiliares
├── navigation/    # Configuração de rotas
├── theme/         # Design System
└── hooks/         # Custom hooks
```

## 🎨 Design System

- Paleta industrial (Primary Blue, Status Colors)
- Componentes otimizados para uso com luvas
- Alto contraste para ambientes industriais

## 🔐 Variáveis de Ambiente

```env
EXPO_PUBLIC_SUPABASE_URL=sua_url_aqui
EXPO_PUBLIC_SUPABASE_ANON_KEY=sua_chave_aqui
```

## 📚 Documentação

- [Documentação do Banco de Dados](docs/DATABASE.md)
- [Guia de Contribuição](CONTRIBUTING.md)

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'feat: Minha nova feature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Proprietary - EngemanX © 2026

## 👨‍💻 Autor

**João Paulo Teles**
- GitHub: [@JoaoPauloTeles](https://github.com/JoaoPauloTeles)

---

**Status**: 🚧 Em Desenvolvimento Ativo
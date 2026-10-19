# Monte seu bolo

Página estática para solicitar um orçamento de bolo pelo WhatsApp, acessível pelo menu e pela seção de bolos sob encomenda na página inicial. O quiz abre diretamente nas escolhas e não confirma pedidos nem processa pagamentos.

## Abrir localmente

Na raiz do repositório:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Acesse http://127.0.0.1:4173/monte-seu-bolo/.

Não precisa de instalação de dependências ou build. Os caminhos relativos também funcionam quando o site é servido dentro de um subdiretório.

## Conteúdo e regras

O objeto `catalogue`, no início de `assets/quiz.js`, concentra as categorias, os 24 recheios, as massas, as medidas, os 12 preços em centavos, o WhatsApp de destino e o prazo mínimo. A fonte é o catálogo de bolos 2026 em `Design Document/Bolo-quiz/`.

- Uma composição de recheio por bolo, dentro da categoria escolhida.
- Premium usa Chiffon; o sabor da massa é combinado pelo WhatsApp.
- Buttercream é o acabamento padrão. As fotografias são inspirações, sem garantia de reprodução ou de preço.
- Frutas, topper e personalizações são sob consulta. O preço exibido é somente o valor base.
- A data precisa respeitar cinco dias de antecedência pelo calendário de Curitiba (`America/Sao_Paulo`). Disponibilidade e horário de retirada são confirmados pela Malili’s.
- A confirmação depende de sinal de 50% do valor total combinado. O formulário não calcula o sinal.
- O resumo abre uma mensagem para `5541997467645`; o envio é feito pela pessoa no WhatsApp.
- As escolhas permanecem apenas no `sessionStorage` da aba, quando disponível. Não há backend ou envio automático. Recomeçar apaga o rascunho após confirmação.

## Ilustrações dos recheios

As 24 ilustrações do passo 3 foram geradas com a ferramenta integrada `image_gen` e salvas como WebP com transparência em `assets/recheios/`. Representam os recheios e ingredientes descritos no catálogo, sem definir a aparência do bolo pronto. Os prompts completos estão em `illustration-prompts.json`. As imagens têm carregamento sob demanda.

## Validação da prévia

A implementação foi verificada com Playwright/Chromium nos tamanhos 360, 390, 768, 1280 e 1440 px. Foram testados todos os preços e opções por categoria, mudanças de categoria, campos obrigatórios, edição, recuperação da sessão, armazenamento indisponível, resumo e codificação da mensagem, cópia e alternativa manual, reinício, navegação por teclado e limite de data na virada do dia em Curitiba. A mensagem não foi enviada.

Também foi executada uma análise axe-core nas sete etapas, com regras WCAG A/AA, incluindo WCAG 2.1/2.2. Capturas de tela e resultados desta execução estão em `/tmp/malilis-pdf-review/`. Isso não substitui testes em aparelhos físicos ou leitores de tela; Safari/iOS e Firefox não foram verificados nesta execução.

Os links de CSS incluem uma versão baseada no conteúdo para evitar estilos antigos em cache. Ao alterar os estilos, atualize as versões nas referências da página inicial e do quiz. Não há build nem etapa de publicação automática nesta pasta.

const point = (icon, title, text) => ({ icon, title, text });
const question = (icon, text, options, answer, hint, why) => ({ icon, text, options, answer, hint, why });
const modules = [
 {id:'sequencias',icon:'🔢',short:'Sequências',title:'Descubra o próximo número',concept:'Uma sequência segue uma regra. Observe quanto aumenta de um número para o outro.',explanation:[
 point('👣','De 2 em 2','2, 4, 6, 8, 10... Cada passo acrescenta 2. Depois de 10 vem 12.'),point('🔟','De 10 em 10','5, 15, 25, 35... Cada passo acrescenta 10. Depois de 35 vem 45.'),point('🔍','Procure a regra','Compare dois números vizinhos. Depois use a mesma regra no espaço vazio.')],questions:[
 question('👣','2, 4, 6, 8, 10, ___ . Qual número vem agora?',['11','12','14'],1,'Conte mais 2 depois de 10.','10 + 2 = 12.'),
 question('🔢','2, 4, 6, 8, 10, 12, ___ . Qual vem depois?',['13','14','15'],1,'Depois de 12, dê um salto de 2.','12 + 2 = 14.'),
 question('🔟','5, 15, 25, 35, ___ . Qual número completa?',['40','45','55'],1,'A cada passo somamos 10.','35 + 10 = 45.'),
 question('🚂','15, 25, 35, 45, ___ . Qual vem depois?',['50','65','55'],2,'Some mais uma dezena a 45.','45 + 10 = 55.'),
 question('🌟','3, 6, 9, 12, ___ . Qual é o próximo?',['15','14','16'],0,'De 3 para 6 aumentou 3. Continue somando 3.','12 + 3 = 15.')],review:question('🔢','10, 12, 14, ___ . Qual número vem depois?',['15','16','18'],1,'Conte de 2 em 2.','14 + 2 = 16.')},
 {id:'tabelas',icon:'🍎',short:'Tabelas',title:'A feira das frutas',concept:'Uma tabela organiza informações. Compare os números para descobrir mais, menos e a diferença.',explanation:[
 point('🍎','Leia a tabela','Na feira: maçã 12, banana 18, laranja 10 e pera 8.'),point('🏆','Compare','18 é a maior quantidade: a banana foi a mais vendida. 8 é a menor: a pera.'),point('➖','Descubra a diferença','Bananas a mais que peras: 18 − 8 = 10.')],questions:[
 question('🍌','Na feira: maçã 12, banana 18, laranja 10 e pera 8. Qual fruta foi mais vendida?',['Pera','Banana','Maçã'],1,'Procure o maior número: 12, 18, 10 ou 8.','18 é a maior quantidade: banana.'),
 question('🍐','Na mesma feira: maçã 12, banana 18, laranja 10 e pera 8. Qual foi menos vendida?',['Pera','Laranja','Banana'],0,'Procure o menor número.','8 é o menor número: pera.'),
 question('🍌','Foram vendidas 18 bananas e 8 peras. Quantas peras a menos que bananas?',['8','10','12'],1,'Faça 18 − 8.','18 − 8 = 10 frutas.'),
 question('🍎','Foram vendidas 12 maçãs e 10 laranjas. Quantas maçãs a mais?',['2','10','22'],0,'Compare 12 com 10: faça 12 − 10.','12 − 10 = 2 maçãs.'),
 question('🧺','Na feira: 12 maçãs e 8 peras. Quantas frutas dessas foram vendidas juntas?',['4','20','18'],1,'Juntar é somar: 12 + 8.','12 + 8 = 20 frutas.')],review:question('🍐','Na tabela, há 18 bananas e 8 peras. Qual é a diferença?',['10','26','8'],0,'Subtraia 8 de 18.','18 − 8 = 10.')},
 {id:'graficos',icon:'📊',short:'Gráficos',title:'Os livros da biblioteca',concept:'Em um gráfico de barras, cada barra mostra uma quantidade. Quanto maior a quantidade, maior a barra.',explanation:[
 point('📚','Dados dos livros','Ana leu 4 livros; Pedro, 6; Luísa, 3; João, 5; Gabriel, 8; Fátima, 12.'),point('📊','Imagine as barras','Ana: ■■■■ (4). Pedro: ■■■■■■ (6). Cada quadradinho representa 1 livro.'),point('🔍','Leia e compare','A barra de Fátima teria 12 quadradinhos. É a maior desse grupo.')],questions:[
 question('📚','Livros lidos: Ana 4; Pedro 6; Luísa 3; João 5; Gabriel 8; Fátima 12. Quem leu mais?',['Fátima','Gabriel','Pedro'],0,'Compare as quantidades e procure a maior.','Fátima leu 12 livros, a maior quantidade.'),
 question('📊','Cada ■ vale 1 livro. Ana: ■■■■. Pedro: ■■■■■■. Quantos livros Pedro leu?',['4','5','6'],2,'Conte os quadradinhos da barra de Pedro.','A barra de Pedro tem 6 quadradinhos: 6 livros.'),
 question('📊','Cada ■ vale 1 livro. Ana: ■■■■. Pedro: ■■■■■■. Quantos livros Pedro leu a mais que Ana?',['2','4','10'],0,'Compare 6 e 4: faça 6 − 4.','6 − 4 = 2 livros.'),
 question('📖','Luísa leu 3 livros e João leu 5. Qual barra deve ser maior?',['A de Luísa','A de João','As duas iguais'],1,'Qual é maior: 3 ou 5?','5 é maior que 3, então a barra de João é maior.'),
 question('📚','Cada ■ vale 1 livro. Gabriel leu 8 livros. Quantos quadradinhos sua barra deve ter?',['6','8','12'],1,'É um quadradinho para cada livro.','8 livros correspondem a 8 quadradinhos.')],review:question('📊','Uma barra tem 4 quadradinhos e cada um vale 1 livro. Quantos livros ela mostra?',['3','4','5'],1,'Conte cada quadradinho uma vez.','4 quadradinhos representam 4 livros.')},
 {id:'dinheiro',icon:'💰',short:'Dinheiro',title:'Compras e troco',concept:'Some os preços para encontrar o total. Para saber o troco, subtraia o total do valor pago.',explanation:[
 point('🛍️','Juntar preços','Um caderno de R$ 15 e uma caixa de lápis de R$ 12 custam juntos R$ 27: 15 + 12 = 27.'),point('💵','Encontrar o troco','Se pagar R$ 27 com R$ 50, o troco é R$ 23: 50 − 27 = 23.'),point('🧸','Itens iguais','Três carrinhos de R$ 8 custam R$ 24: 8 + 8 + 8 = 24.')],questions:[
 question('✏️','Um caderno custa R$ 15 e uma caixa de lápis custa R$ 12. Quanto custam juntos?',['R$ 27','R$ 17','R$ 37'],0,'Some 15 + 12.','15 + 12 = 27 reais.'),
 question('💵','A compra custou R$ 27 e foi paga com R$ 50. Quanto é o troco?',['R$ 27','R$ 23','R$ 33'],1,'Faça 50 − 27.','50 − 27 = 23 reais.'),
 question('🚗','São 3 carrinhos de R$ 8 cada. Quanto custam ao todo?',['R$ 11','R$ 18','R$ 24'],2,'Some 8 + 8 + 8.','Três grupos de 8: 8 + 8 + 8 = 24 reais.'),
 question('🪙','Os carrinhos custaram R$ 24. Pedro tinha R$ 40. Quanto sobrou?',['R$ 16','R$ 24','R$ 14'],0,'Faça 40 − 24.','40 − 24 = 16 reais.'),
 question('🍞','Um pão custa R$ 4. Você paga com R$ 10. Quanto recebe de troco?',['R$ 14','R$ 6','R$ 4'],1,'Tire 4 de 10.','10 − 4 = 6 reais.')],review:question('💰','Um brinquedo custa R$ 12. Você paga com R$ 20. Qual é o troco?',['R$ 8','R$ 12','R$ 32'],0,'Faça 20 − 12.','20 − 12 = 8 reais.')},
 {id:'capacidade',icon:'🥤',short:'Litros e mL',title:'A cozinha das medidas',concept:'Litro (L) e mililitro (mL) medem capacidade. 1 litro corresponde a 1.000 mililitros.',explanation:[
 point('🥛','Uma medida, dois nomes','1 L = 1.000 mL. Meio litro é 500 mL.'),point('🫗','Juntando litros','2 L = 2.000 mL, pois 1.000 + 1.000 = 2.000.'),point('🥤','Quanto restou?','Se há 2.000 mL e bebemos 500 mL, restam 1.500 mL.')],questions:[
 question('🥛','Quantos mililitros há em 1 litro?',['100 mL','1.000 mL','10 mL'],1,'Um litro equivale a mil mililitros.','1 L = 1.000 mL.'),
 question('🫗','Uma garrafa tem 2 litros. Quantos mililitros são?',['2.000 mL','200 mL','1.000 mL'],0,'Cada litro tem 1.000 mL. Some duas vezes.','2 L = 1.000 + 1.000 = 2.000 mL.'),
 question('🥤','A garrafa tinha 2.000 mL de suco. Foram consumidos 500 mL. Quanto restou?',['1.000 mL','1.500 mL','2.500 mL'],1,'Faça 2.000 − 500.','2.000 − 500 = 1.500 mL.'),
 question('🍋','Havia 3 litros de limonada. As crianças beberam 1 litro. Quantos litros sobraram?',['2 L','3 L','4 L'],0,'Faça 3 − 1.','3 − 1 = 2 litros.'),
 question('🧃','Dois copos têm 500 mL cada. Juntos têm quanto?',['500 mL','1.000 mL','2.000 mL'],1,'Some 500 + 500.','500 + 500 = 1.000 mL, ou 1 litro.')],review:question('🥤','Quantos mililitros há em 2 litros?',['200','1.000','2.000'],2,'Cada litro vale 1.000 mL.','2 L = 2.000 mL.')},
 {id:'massa',icon:'⚖️',short:'Quilos e gramas',title:'A balança do mercado',concept:'Quilograma (kg) e grama (g) medem massa. 1 kg corresponde a 1.000 g.',explanation:[
 point('⚖️','A equivalência','1 kg = 1.000 g. Assim, 3 kg = 3.000 g.'),point('🍉','Juntar massas','Uma melancia de 3 kg e arroz de 5 kg têm juntos 8 kg: 3 + 5 = 8.'),point('🍰','Quanto sobra?','2 kg de farinha são 2.000 g. Se usamos 500 g, sobram 1.500 g.')],questions:[
 question('⚖️','Quantos gramas há em 1 quilograma?',['100 g','1.000 g','10 g'],1,'Um quilo equivale a mil gramas.','1 kg = 1.000 g.'),
 question('🍉','Uma melancia pesa 3 kg e o arroz pesa 5 kg. Quanto pesam juntos?',['2 kg','8 kg','15 kg'],1,'Para juntar, some 3 + 5.','3 + 5 = 8 kg.'),
 question('🍉','A melancia pesa 3 kg. Quantos gramas são?',['300 g','3.000 g','30 g'],1,'Cada quilo tem 1.000 g.','3 kg = 3.000 g.'),
 question('🌾','Dona Ana comprou 2 kg de farinha. Quantos gramas ela comprou?',['2.000 g','200 g','1.000 g'],0,'Cada quilo vale 1.000 g.','2 kg = 2.000 g.'),
 question('🍰','De 2.000 g de farinha, foram usados 500 g. Quantos gramas sobraram?',['2.500 g','1.000 g','1.500 g'],2,'Faça 2.000 − 500.','2.000 − 500 = 1.500 g.')],review:question('⚖️','Quantos gramas há em 3 kg?',['300 g','3.000 g','1.000 g'],1,'Cada quilo tem 1.000 gramas.','3 kg = 3.000 g.')},
 {id:'multiplicacao',icon:'✖️',short:'Grupos iguais',title:'O jardim dos grupos',concept:'Multiplicar é uma maneira de contar grupos com a mesma quantidade.',explanation:[
 point('🌱','Conte grupos iguais','4 salas com 6 mesas em cada: 6 + 6 + 6 + 6 = 24 mesas. Também escrevemos 4 × 6 = 24.'),point('➕','Mudança em cada grupo','Se cada sala receber mais 3 mesas, cada uma terá 9. Em 4 salas: 4 × 9 = 36 mesas.'),point('🌳','Mais um grupo','5 fileiras com 8 árvores têm 40 árvores. Com mais uma fileira igual, 6 × 8 = 48.')],questions:[
 question('🪑','Há 4 salas com 6 mesas em cada. Quantas mesas ao todo?',['10','24','20'],1,'Some 6 quatro vezes: 6 + 6 + 6 + 6.','4 × 6 = 24 mesas.'),
 question('🏫','Cada uma das 4 salas tinha 6 mesas e ganhou mais 3. Quantas mesas há agora ao todo?',['27','36','12'],1,'Cada sala fica com 9 mesas. São 4 grupos de 9.','6 + 3 = 9 em cada sala; 4 × 9 = 36 mesas.'),
 question('🌳','Há 5 fileiras com 8 árvores em cada. Quantas árvores ao todo?',['13','35','40'],2,'Some 8 cinco vezes ou calcule 5 × 8.','5 × 8 = 40 árvores.'),
 question('🌳','E se houver mais uma fileira de 8 árvores, ficando 6 fileiras ao todo?',['48','41','56'],0,'Acrescente 8 às 40 árvores.','40 + 8 = 48 árvores.'),
 question('🌼','Há 3 vasos com 4 flores em cada. Quantas flores há ao todo?',['7','12','16'],1,'Some 4 + 4 + 4.','3 × 4 = 12 flores.')],review:question('✖️','Há 3 grupos com 4 estrelas em cada. Quantas estrelas ao todo?',['7','12','16'],1,'Some 4 + 4 + 4.','3 × 4 = 12 estrelas.')}
];

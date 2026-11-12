// Pequenas histórias e apoios visuais para a leitura acompanhada.
const stories = {
 sequencias:{intro:'Elisa e João estão colocando pedrinhas no caminho. A cada parada, eles juntam sempre a mesma quantidade. Vamos acompanhar?', points:[
  ['👣','Pares de pedrinhas','Primeiro há 2 pedrinhas. Em cada parada chegam mais 2. Aponte para cada número e conte junto.',{type:'steps',label:'A cada salto, mais 2',values:['2','4','6','8','10','12'],jump:'+2'}],
  ['🖐️','De cinco em cinco','Agora João guarda 5 figurinhas em cada envelope. Cada envelope acrescenta mais 5 figurinhas.',{type:'steps',label:'A cada envelope, mais 5',values:['5','10','15','20','25'],jump:'+5'}],
  ['🚂','De dez em dez','No trenzinho há 5 passageiros. Em cada estação entram mais 10. O total vai aumentando de 10 em 10.',{type:'steps',label:'A cada estação, mais 10',values:['5','15','25','35','45'],jump:'+10'}],
  ['🔍','Descubra a regra','Olhe dois números vizinhos. Pergunte: quanto foi acrescentado? Repita o mesmo salto para descobrir o próximo.',{type:'tiles',label:'Exemplo: 10 mais 2',tiles:['10','+ 2','12']}]]},
 tabelas:{intro:'Na feira, Dona Ana anotou quantas frutas vendeu. Elisa vai ajudá-la a ler os números e comparar as quantidades.',points:[
  ['🧺','Veja a anotação','Cada linha mostra uma fruta e a quantidade vendida. Leia uma linha de cada vez.',{type:'table',label:'Frutas vendidas na feira',rows:[['🍎 Maçã','12'],['🍌 Banana','18'],['🍊 Laranja','10'],['🍐 Pera','8']]}],
  ['🏆','Qual vendeu mais?','Compare os números da tabela. O maior é 18: foram as bananas. O menor é 8: foram as peras.',{type:'tiles',label:'Comparando as quantidades',tiles:['🍌 18 bananas','🍐 8 peras']}],
  ['➖','Quanto a mais?','Houve 18 bananas e 8 peras. Para saber a diferença, retiramos 8 de 18: sobram 10.',{type:'tiles',label:'Diferença entre bananas e peras',tiles:['18 bananas','− 8 peras','= 10 de diferença']}]]},
 graficos:{intro:'A turma de João anotou quantos livros cada pessoa leu. Eles vão transformar a lista em um gráfico de barras.',points:[
  ['📚','Cada quadradinho é um livro','Ana leu 4 livros. Pedro leu 6. No gráfico, cada quadradinho representa 1 livro.',{type:'bars',label:'Cada quadradinho representa 1 livro',rows:[['Ana',4],['Pedro',6]]}],
  ['📊','A turma inteira','Agora compare as barras de toda a turma. A barra maior representa mais livros lidos.',{type:'bars',label:'Livros lidos por pessoa; cada quadradinho vale 1 livro',rows:[['Ana',4],['Pedro',6],['Luísa',3],['João',5],['Gabriel',8],['Fátima',12]]}],
  ['🔍','O que o gráfico conta?','A barra de Fátima tem 12 quadradinhos: é a maior. Pedro leu 2 livros a mais que Ana, pois 6 − 4 = 2.',{type:'tiles',label:'Comparação dos livros',tiles:['Pedro: 6 livros','− Ana: 4 livros','= 2 livros a mais']}]]},
 dinheiro:{intro:'Mariana vai à papelaria. Ela escolheu um caderno e uma caixa de lápis. Vamos acompanhá-la até o caixa?',points:[
  ['🛍️','O que Mariana escolheu','O caderno custa R$ 15 e a caixa de lápis custa R$ 12. Para saber quanto pagar, juntamos os dois preços.',{type:'tiles',label:'As compras de Mariana',tiles:['📓 Caderno · R$ 15','+ ✏️ Lápis · R$ 12','= R$ 27']}],
  ['💵','A hora de pagar','Mariana entrega R$ 50 para pagar a compra de R$ 27. O dinheiro que volta para ela é o troco.',{type:'tiles',label:'Pagamento e troco',tiles:['💵 Pagou R$ 50','− Compra R$ 27','= Troco R$ 23']}],
  ['🚗','Na loja de brinquedos','Pedro escolheu 3 carrinhos de R$ 8 cada. Juntamos três vezes o preço: 8 + 8 + 8 = 24 reais.',{type:'tiles',label:'Três carrinhos de 8 reais cada',tiles:['🚗 R$ 8','🚗 R$ 8','🚗 R$ 8','= R$ 24']}]]},
 capacidade:{intro:'Na cozinha, Elisa e João estão preparando suco para a família. Eles precisam descobrir quanto cabe na jarra e quanto sobra.',points:[
  ['🥛','Uma garrafa de 1 litro','Uma garrafa de 1 litro também pode ser medida como 1.000 mililitros. São duas formas de dizer a mesma quantidade.',{type:'tiles',label:'Uma mesma quantidade em duas unidades',tiles:['🥛 1 litro','= 1.000 mL']}],
  ['🧃','Duas garrafas','João encheu duas garrafas de 1 litro. Cada uma tem 1.000 mL; juntas têm 2.000 mL.',{type:'tiles',label:'Duas garrafas de um litro',tiles:['🧃 1.000 mL','+ 🧃 1.000 mL','= 2.000 mL']}],
  ['🥤','Depois do lanche','Das duas garrafas, a família bebeu 500 mL. Tirando 500 de 2.000 mL, ficam 1.500 mL.',{type:'tiles',label:'Quantidade que restou',tiles:['2.000 mL','− 500 mL','= 1.500 mL']}]]},
 massa:{intro:'Dona Ana vai ao mercado e depois faz um bolo. Elisa ajuda a pesar as compras e a descobrir quanto de farinha sobrou.',points:[
  ['⚖️','Quilos e gramas','Um pacote de 1 quilograma também pesa 1.000 gramas. As duas medidas indicam a mesma massa.',{type:'tiles',label:'Uma mesma massa em duas unidades',tiles:['📦 1 kg','= 1.000 g']}],
  ['🍉','As compras no mercado','A melancia pesa 3 kg e o pacote de arroz pesa 5 kg. Para saber o peso dos dois juntos, somamos 3 + 5.',{type:'tiles',label:'As compras juntas',tiles:['🍉 3 kg','+ 🍚 5 kg','= 8 kg']}],
  ['🍰','A farinha do bolo','Dona Ana comprou 2 kg de farinha: são 2.000 g. Usou 500 g e ficaram 1.500 g.',{type:'tiles',label:'Farinha que sobrou',tiles:['2.000 g','− 500 g','= 1.500 g']}]]},
 multiplicacao:{intro:'Na escola há salas com a mesma quantidade de mesas. No jardim, as árvores estão organizadas em fileiras. Vamos contar em grupos?',points:[
  ['🏫','Mesas nas salas','Há 4 salas. Em cada uma há 6 mesas. Podemos somar 6 quatro vezes: são 24 mesas.',{type:'groups',label:'Quatro salas, seis mesas em cada',groups:4,count:6,symbol:'●',unit:'mesas'}],
  ['➕','Chegaram mais mesas','Cada sala recebeu mais 3 mesas. Então cada uma ficou com 9. Quatro grupos de 9 fazem 36 mesas.',{type:'tiles',label:'Mesas em cada sala e nas quatro salas',tiles:['6 + 3 = 9 em cada','4 grupos de 9','= 36 mesas']}],
  ['🌳','Uma fileira a mais','O jardim tem 5 fileiras de 8 árvores: 40 árvores. Chega mais uma fileira de 8; agora são 48.',{type:'tiles',label:'Árvores no jardim',tiles:['5 fileiras de 8 = 40','+ 1 fileira de 8','= 48 árvores']}]]}
};
Object.entries(stories).forEach(([id,story]) => {
 const module=modules.find(m=>m.id===id);
 module.explanation=story.points.map(([icon,title,text,visual])=>({icon,title,text,visual}));
});
// Uma prática explícita de 5 em 5, além dos saltos de 2 e de 10 da atividade.
modules[0].questions[4]=question('🖐️','João guarda 5 figurinhas em cada envelope. Ele conta: 5, 10, 15, 20, ___. Quantas figurinhas são depois do próximo envelope?',['25','22','30'],0,'Cada envelope acrescenta mais 5. Conte a partir de 20.','20 + 5 = 25 figurinhas.');
function makeStoryVisual(data) {
 const box=document.createElement('div'); box.className='story-visual'; box.setAttribute('role','group'); box.setAttribute('aria-label',data.label);
 const caption=document.createElement('p'); caption.className='visual-caption'; caption.textContent=data.label; box.append(caption);
 if(data.type==='steps') {
  const row=document.createElement('div'); row.className='visual-steps';
  data.values.forEach((v,i)=>{ if(i){const a=document.createElement('span');a.className='visual-jump';a.textContent='→ '+data.jump;row.append(a);} const n=document.createElement('span');n.className='visual-number';n.textContent=v;row.append(n); }); box.append(row);
 } else if(data.type==='tiles') {
  const row=document.createElement('div'); row.className='visual-tiles'; data.tiles.forEach(v=>{const t=document.createElement('span');t.className='visual-tile';t.textContent=v;row.append(t);}); box.append(row);
 } else if(data.type==='table') {
  const table=document.createElement('table');table.className='visual-table'; const body=document.createElement('tbody');
  data.rows.forEach(([name,value])=>{const tr=document.createElement('tr'),th=document.createElement('th'),td=document.createElement('td');th.scope='row';th.textContent=name;td.textContent=value;tr.append(th,td);body.append(tr);});table.append(body);box.append(table);
 } else if(data.type==='bars') {
  const chart=document.createElement('div');chart.className='visual-chart';data.rows.forEach(([name,count])=>{const row=document.createElement('div');row.className='visual-bar-row';const label=document.createElement('span');label.textContent=name;const blocks=document.createElement('span');blocks.className='visual-bar';blocks.setAttribute('aria-hidden','true');for(let i=0;i<count;i++){const b=document.createElement('i');blocks.append(b);}const number=document.createElement('strong');number.textContent=count;row.append(label,blocks,number);chart.append(row);});box.append(chart);
 } else if(data.type==='groups') {
  const wrap=document.createElement('div');wrap.className='visual-groups';for(let i=0;i<data.groups;i++){const group=document.createElement('div');group.className='visual-group'; const name=document.createElement('strong');name.textContent='Sala '+(i+1);const dots=document.createElement('span');dots.textContent=Array(data.count).fill(data.symbol).join(' '); const label=document.createElement('small');label.textContent=data.count+' '+data.unit;group.append(name,dots,label);wrap.append(group);}box.append(wrap);
 }
 return box;
}
const questionVisuals = {
 sequencias:[
  {type:'steps',label:'Acrescente 2 em cada salto',values:['2','4','6','8','10','?'],jump:'+2'},
  {type:'steps',label:'Acrescente 2 em cada salto',values:['8','10','12','?'],jump:'+2'},
  {type:'steps',label:'Acrescente 10 em cada salto',values:['5','15','25','35','?'],jump:'+10'},
  {type:'steps',label:'Acrescente 10 em cada salto',values:['15','25','35','45','?'],jump:'+10'},
  {type:'steps',label:'Acrescente 5 em cada envelope',values:['5','10','15','20','?'],jump:'+5'}],
 tabelas:Array(5).fill({type:'table',label:'Frutas vendidas na feira',rows:[['🍎 Maçã','12'],['🍌 Banana','18'],['🍊 Laranja','10'],['🍐 Pera','8']]}),
 graficos:[
  {type:'bars',label:'Cada quadradinho representa 1 livro',rows:[['Ana',4],['Pedro',6],['Luísa',3],['João',5],['Gabriel',8],['Fátima',12]]},
  {type:'bars',label:'Cada quadradinho representa 1 livro',rows:[['Ana',4],['Pedro',6]]},
  {type:'bars',label:'Cada quadradinho representa 1 livro',rows:[['Ana',4],['Pedro',6]]},
  {type:'bars',label:'Cada quadradinho representa 1 livro',rows:[['Luísa',3],['João',5]]},
  {type:'tiles',label:'A barra de Gabriel',tiles:['📚 Gabriel leu 8 livros','■ = 1 livro']}],
 dinheiro:[
  {type:'tiles',label:'Compras na papelaria',tiles:['📓 Caderno · R$ 15','✏️ Lápis · R$ 12']},
  {type:'tiles',label:'No caixa',tiles:['🛍️ Compra · R$ 27','💵 Pagou · R$ 50']},
  {type:'tiles',label:'Três carrinhos',tiles:['🚗 R$ 8','🚗 R$ 8','🚗 R$ 8']},
  {type:'tiles',label:'Dinheiro de Pedro',tiles:['💵 Tinha R$ 40','🚗 Gastou R$ 24']},
  {type:'tiles',label:'Na padaria',tiles:['🍞 Pão · R$ 4','💵 Pagou R$ 10']}],
 capacidade:[
  {type:'tiles',label:'Uma garrafa de suco',tiles:['🥛 1 litro','= ? mL']},
  {type:'tiles',label:'Dois litros de suco',tiles:['🧃 1 litro','🧃 1 litro']},
  {type:'tiles',label:'Suco antes e depois do lanche',tiles:['🧃 Havia 2.000 mL','🥤 Beberam 500 mL']},
  {type:'tiles',label:'Limonada da festa',tiles:['🍋 Havia 3 L','🥤 Beberam 1 L']},
  {type:'tiles',label:'Dois copos',tiles:['🥤 500 mL','🥤 500 mL']}],
 massa:[
  {type:'tiles',label:'Um pacote',tiles:['📦 1 kg','= ? g']},
  {type:'tiles',label:'Compras no mercado',tiles:['🍉 Melancia · 3 kg','🍚 Arroz · 5 kg']},
  {type:'tiles',label:'Peso da melancia',tiles:['🍉 3 kg','= ? g']},
  {type:'tiles',label:'Farinha comprada',tiles:['🌾 2 kg','= ? g']},
  {type:'tiles',label:'Farinha para o bolo',tiles:['🌾 Comprou 2.000 g','🍰 Usou 500 g']}],
 multiplicacao:[
  {type:'groups',label:'Quatro salas com seis mesas em cada',groups:4,count:6,symbol:'●',unit:'mesas'},
  {type:'tiles',label:'O que aconteceu em cada sala',tiles:['🏫 4 salas','🪑 6 mesas em cada','+ 3 mesas em cada']},
  {type:'groups',label:'Cinco fileiras com oito árvores em cada',groups:5,count:8,symbol:'🌳',unit:'árvores'},
  {type:'tiles',label:'Árvores no jardim',tiles:['🌳 5 fileiras de 8','+ 1 fileira de 8']},
  {type:'groups',label:'Três vasos com quatro flores em cada',groups:3,count:4,symbol:'🌼',unit:'flores'}]
};

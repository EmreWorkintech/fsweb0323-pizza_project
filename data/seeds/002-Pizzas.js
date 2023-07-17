/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries

  await knex('Pizzas').insert([
    {id: 1, name: 'Position Absolute Acı Pizza', description: "Frontent Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir. . Küçük bir pizzaya bazen pizzetta denir.", price: 85.50},
    {id: 2, name: 'Terminal Pizza', description: "lorem ipsum sit o dolor", price: 60.00},
    {id: 3, name: 'FSWEB0323 Pizza', description: "lorem ipsum sit o dolor kolor", price: 105.50}
  ]);
};

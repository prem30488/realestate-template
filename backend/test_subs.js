const { Subscriber } = require('./models');

async function test() {
  const subs = await Subscriber.findAll();
  console.log(subs.map(s => s.toJSON()));
}

test();

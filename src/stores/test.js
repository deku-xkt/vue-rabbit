var name = 'window1';
const obj = {
  name: 'obj1',
  sayName() { console.log(this.name); },
  sayArrow: () => console.log(this.name)
};
obj.sayName();
obj.sayArrow();
const say = obj.sayName;
say();

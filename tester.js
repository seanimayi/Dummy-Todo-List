const obj = [
    {id: 1, name:"Imayi Osifo Sean", class:"LEVEL 100", Institute: "UNILAG", course: "Computer Science"},
    {id: 2, name:"Imayi Elube Scott", class:"LEVEL 100", Institute: "UNILAG", course: "Mechatronics"},
    {id: 3, name:"????", class:"????", Institute: "????", course: "????"},
]

const index = obj.filter((task) => task.id !== 2);

console.log(index)
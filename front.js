
var arry = [];
console.log("penis");
function Group(name, phoneNumber, email, unique) {
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.unique = unique;
}


$("#tableRes").on("click", function(res) {
res.preventDefault();
var name = $("#name").val();
var number = $("#number").val();
var email = $("#email").val();
var unique = $("#unique").val();
var newCust = new Group(name, number, email, unique);
console.log(newCust);
arry.push(newCust);

$.post("api/new", newCust)
.then(function(data) {
    console.log(data);
    
})
})


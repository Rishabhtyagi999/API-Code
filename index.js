const express = require("express");
const app = express ();
const PORT = 3000;

const people = [
    {
      FirstName: "James",
      Address: "123 Main St",
      PhoneNumber: "998-755-655"
    },
    {
      FirstName: "Anand",
      Address: "25 Koramangala",
      PhoneNumber: "555-987-6543"
    },
    {
      FirstName: "Hari",
      Address: "36 Indira Nagar",
      PhoneNumber: "990-123-456"
    }
  ];

  app.get('/api/search/:inputString',(req,res) =>{
    let inputString = req.params.inputString.toLowerCase();
    console.log(`Searching for ${inputString}`);
    if (!inputString) {
        return res.status(400).json({ error: 'Empty input provided' });
      }
    const searchResult = people.find(obj=>obj.FirstName.toLowerCase() == inputString || obj.Address.toLowerCase() == inputString || obj.PhoneNumber.toLowerCase() == inputString);

    if(!["",null].includes(searchResult)){
        res.status(200).json({Response: searchResult})
    }else{
        res.status(404).json({Response: "No results found"})
    }
  })


  const server = app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

module.exports = { app, server };
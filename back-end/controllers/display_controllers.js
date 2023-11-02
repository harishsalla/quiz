const db=require("../config/config")
const Display=db.display
// const prettier=require('prettier')
// const csv=require('csv-parser')
// const multer=require('multer')
// const beautify=require('js-beautify')
// const fs=require('fs')
// const storage=multer.memoryStorage();
// const upload=multer({storage:storage})




// const {Sequelize,DataTypes}=require("sequelize");




// const display_con= async ((upload.single),(req,res)=>{
//     const fileBuffer =await  req.file.buffer;
//     const filename = `./${req.file.originalname}`;
//     fs.writeFile(filename, fileBuffer, async (err) => {
//         if (err) {
//           console.error(err);
//           return res.status(500).send("Error saving the file.");
//         }
    
//         const readableStream = fs.createReadStream(filename);
//         let rows=[]
//         readableStream
//           .pipe(csv())
//           .on('data', (row) => {
//             console.log(JSON.stringify(row));
//             rows.push(row)
//             console.log(rows)
//             res.send(JSON.stringify(row))
//           })
          
          
//           .on('end', () => {
//             res.json(rows);
//           });
//       });

//     const code = `function factorial(number) { if (number === 0 || number === 1) { return 1; } else {  return number * factorial(number – 1); } }`;

//     const formattedCode = beautify(inputValue, { indent_size: 2, space_in_empty_paren: false });
//     console.log(formattedCode);

//     const createData=await Display.create({
//         text_value:formattedCode
//     })
//     res.send(formattedCode)

// }

// const getall=async(req,res)=>{
//     const allValue=await Display.findAll({
        
//     })
//     res.status(200).json({"value":allValue})
// }

// module.exports={
//     display_con,getall
// }
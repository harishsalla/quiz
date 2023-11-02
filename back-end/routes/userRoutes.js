const express = require("express");
const router = express.Router();
const multer = require("multer");
const csv = require("csv-parser");
const db = require("../config/config");
const beautify = require("js-beautify");
const beautifyCSS = require("js-beautify").css;
const beautifyHTML = require("js-beautify").html;
const Display = db.display;
const prettier = require("prettier");
const esprima = require("esprima");

const fs = require("fs");

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), async (req, res) => {
  const fileBuffer = req.file.buffer;
  const filename = `./${req.file.originalname}`;

  fs.writeFile(filename, fileBuffer, (err) => {
    const rows = [];

    const readableStream = fs.createReadStream(filename);

    readableStream
      .pipe(csv())
      .on("data", async (row) => {
        rows.push(row);
      })
      .on("end", async () => {
        res.send(rows);

        for (let value of rows) {
          const new_obj={
            code:"",
            first_option:'',
            second_option:''
          }
       

          if (value.QUESTION_TYPE === "JAVASCRIPT") {
            try {
             
              for(let new_value in value){
                if(new_value==="CODE"){
                  new_obj.code=beautify(value.CODE, {
                    indent_size: 2,
                    space_in_empty_paren: false,
                  });
                }
                else if(new_value==="FIRST_OPTION"){
                  new_obj.first_option=beautify(value.FIRST_OPTION, {
                    indent_size: 2,
                    space_in_empty_paren: false,
                  });
                }
                else if(new_value==="SECOND_OPTION"){
                  new_obj.second_option=beautify(value.SECOND_OPTION, {
                    indent_size: 2,
                    space_in_empty_paren: false,
                  });
                }
              }
             
              // console.log(typeof(formattedCode))
              const data = await Display.create({ 
                question_text:value.QUESTION,
                question_code:new_obj.code,
                question_description:value.DESCRIPTION,
                first_option:new_obj.first_option,
                second_option:new_obj.second_option

                
              });
              console.log(new_obj)
            } catch (error) {
              console.log(error, "error_message");
            }
          } else if (value.QUESTION_TYPE === "HTML") {
            try {
              for(let new_value in value){
                if(new_value==="CODE"){
                  new_obj.code=beautifyHTML(value.CODE, {
                      indent_size: 4,
                      wrap_line_length: 80,
                    });
                }
                else if(new_value==="FIRST_OPTION"){
                  new_obj.first_option=beautifyHTML(value.CODE, {
                    indent_size: 4,
                    wrap_line_length: 80,
                  });
                }
                else if(new_value==="SECOND_OPTION"){
                  new_obj.second_option=beautifyHTML(value.CODE, {
                    indent_size: 4,
                    wrap_line_length: 80,
                  });
                }
              }
             
              // console.log(typeof(formattedCode))
              const data = await Display.create({ 
                question_text:value.QUESTION,
                question_code:new_obj.code,
                question_description:value.DESCRIPTION,
                first_option:new_obj.first_option,
                second_option:new_obj.second_option

                
              });
              console.log(new_obj)
            } catch (error) {
              console.log(error, "error_message");
            }
            
          } else if (value.QUESTION_TYPE === "CSS") {
            try {
              for(let new_value in value){
                if(new_value==="CODE"){
                  new_obj.code= beautifyCSS(value.CODE, {
                    indent: "    ",
                    autosemicolon: true,
                  });
                }
                else if(new_value==="FIRST_OPTION"){
                  new_obj.first_option= beautifyCSS(value.CODE, {
                    indent: "    ",
                    autosemicolon: true,
                  });
                }
                else if(new_value==="SECOND_OPTION"){
                  new_obj.second_option= beautifyCSS(value.CODE, {
                    indent: "    ",
                    autosemicolon: true,
                  });
                }
              }
              const data = await Display.create({ 
                question_text:value.QUESTION,
                question_code:new_obj.code,
                question_description:value.DESCRIPTION,
                first_option:new_obj.first_option,
                second_option:new_obj.second_option
              });
              console.log(new_obj)
            } catch (error) {
              console.log(error, "error_message");
            }
          } else if (value.QUESTION_TYPE === "SALESFORCE") {try {
            for(let new_value in value){
              if(new_value==="CODE"){
                new_obj.code= beautify(value.CODE, {
                  indent_size: 2,
                  space_in_empty_paren: false,
                });
              }
              else if(new_value==="FIRST_OPTION"){
                new_obj.first_option= beautify(value.CODE, {
                  indent_size: 2,
                  space_in_empty_paren: false,
                });

              }
              else if(new_value==="SECOND_OPTION"){
                new_obj.second_option=beautify(value.CODE, {
                  indent_size: 2,
                  space_in_empty_paren: false,
                });
              }
            }
            const data = await Display.create({ 
              question_text:value.QUESTION,
              question_code:new_obj.code,
              question_description:value.DESCRIPTION,
              first_option:new_obj.first_option,
              second_option:new_obj.second_option
            });
            console.log(new_obj)
          } catch (error) {
            console.log(error, "error_message");
          }
          }
        }
      });
  });
});

router.get("/getallusers", async (req, res) => {
  try {
    const allValue = await Display.findAll({});
    res.status(200).json({ value: allValue });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

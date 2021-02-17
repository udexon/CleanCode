// cleaner.js

const fs = require("fs"); // comes with node.
const esprima = require("esprima"); 
const escodegen = require("escodegen"); 

// module.exports.cleaner = function () {
  try {
    let file, data, nocomments;

    const filePath = process.argv[2];
    const o_dir = process.argv[3];

    const regex = new RegExp(/((^\/\*\*\n(\D\W.+\n)+))/, "gm");
    
    var fi_da = filePath.split('/');
    var fi_file = fi_da.pop(); 
    
    const o_f = o_dir + '/' + fi_file;
    console.log( o_f );
    
    console.log( fi_da, fi_file );
    
    var f_o = fs.openSync(o_f, "w", 0o666);

    fs.accessSync(filePath, fs.constants.F_OK);

    file = fs.openSync(filePath, "r+", fs.constants.O_RDWR);
    data = fs.readFileSync(file, "utf8");
    nocomments = data.replace(regex, "");
    var parsed = esprima.parseModule(data);
    var o_gen = escodegen.generate(parsed); // Returns "console.log('Hello world!')";
    
    console.log(o_gen);
    
    for (i in process.argv) console.log( process.argv[i] )

    fs.writeFileSync(o_f, o_gen);
    return "Comments Removed";
  } catch (error) {
    console.log(error);
    return error;  
  }
// }


// //   .arguments('<cmd>')

// program.command('add')
//        .description('add new note')
//        .arguments('<title><date>')




const fs = require('fs');
const dbSting = fs.readFileSync("./dataentries.json",'utf8') || '[]';
const dbEntriey = JSON.parse(dbSting);



const { program } = require('commander');
program.version('0.0.1');

program
  .version('0.1.0')
  .option('-t, --title', 'the title of entry')
  .option('-i, --id', 'the id of entry')
// //   .requiredOption('-c, --cheese <type>', 'pizza must have cheese');


//----------------------------- ADD Entry ----------------------------------
program
  .command('add')
  .description('run Add commands to Add Entry')
  .requiredOption('-t, --title <title>', 'The title of entry to Add')
  .action(function({title}){
    const id = dbEntriey.length + 1;
    dbEntriey.push({title,id});
    fs.writeFileSync("./dataentries.json", JSON.stringify(dbEntriey,null,2));
    console.log("Your Data Added Successfully")
    console.log(dbEntriey);

  });

  //----------------------------- List Entries ----------------------------------
program
.command('list')
.description('run List commands to List Entries')
.action(function(){
  fs.writeFileSync("./dataentries.json", JSON.stringify(dbEntriey,null,2));
  console.log(dbEntriey);

});

  //----------------------------- Edit Entry ----------------------------------
  program
  .command('edit')
  .description('run Edit commands to Edit Entry')
  .requiredOption('-i, --id <id>', 'The ID of entry')
  .requiredOption('-t, --title <title>', 'The title of entry to Edit')
  .action(function({id,title}){
    dbEntriey.find(e => e.id == id).title = title;
    fs.writeFileSync("./dataentries.json", JSON.stringify(dbEntriey,null,2));
    console.log("Your Data Edited Successfully")
    console.log(dbEntriey);

  });

//----------------------------- Delete Entry ----------------------------------
program
.command('delete')
.description('run Delete commands to Delete Entry')
.option('-i, --id <id>', 'The ID of entry')
.action(function({id}){
  const index = dbEntriey.findIndex(e => e.id == id);
  dbEntriey.splice(index, 1);
  fs.writeFileSync("./dataentries.json", JSON.stringify(dbEntriey,null,2));
  console.log("Your Data Deleted Successfully")
  console.log(dbEntriey);
});



  program.parse(process.argv);


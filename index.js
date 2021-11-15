const express = require('express');
// const { uploadTemplate } = require('./libs/createStack')
const fileUpload = require('express-fileupload');
const { CreateStackCommand } = require("@aws-sdk/client-cloudformation");
const {cloudformationClient} = require("./libs/client/cloudformationClient");

const app = express();
const port = 3000;

app.use(fileUpload());
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile('./index.html', { root: __dirname })
});

app.use(express.static(__dirname));

app.get('/home', (req, res) => {
    res.sendFile('./home.html', { root: __dirname })
});

app.get('/upload_script', (req, res) => {
    res.sendFile('./upload_script.html', { root: __dirname })
});

app.post('/upload_script', async (req, res) => {
    if(req.files){
        try{
            const stackName = req.body.namaStack;
            const template = req.files.template;
            const templateBody = template.data.toString();

            const params = {
                StackName: stackName, 
                TemplateBody: templateBody
            };
            
            const command = new CreateStackCommand(params);
            let data = await cloudformationClient.send(command);
            console.log(data);
          } catch (err) {
              console.log("Error", err);
          }
        res.sendFile('./result.html', { root: __dirname })
    }
});

app.get('/result', (req, res) => {
    res.sendFile('./result.html', { root: __dirname })
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

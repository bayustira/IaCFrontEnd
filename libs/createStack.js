const { CreateStackCommand } = require("@aws-sdk/client-cloudformation");
const {cloudformationClient} = require("./client/cloudformationClient");

const uploadTemplate = async (req) => {
  const stackName = req.body.namaStack;
  const template = req.files.template;
  const templateBody = template.data.toString();

  const params = {
    StackName: stackName, 
    TemplateBody: templateBody
  };
  
  const command = new CreateStackCommand(params);
  try{
    let data = await cloudformationClient.send(command);
    console.log(data);
  } catch (err) {
      console.log("Error", err);
  }
};

module.exports = {uploadTemplate};

const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');

module.exports = {
  boletim: async function (user , senha) {
    console.log("user: " + user.substr(-20,6)+"******" + " senha: " + senha.substr(-20,4)+"****" );
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('https://sig.ifrs.edu.br/sigaa/verTelaLogin.do');
      await page.type('#conteudo > div.logon > form > table > tbody > tr:nth-child(1) > td > input[type=text]', "01639243097");
      await page.type('#conteudo > div.logon > form > table > tbody > tr:nth-child(2) > td > input[type=password]', "33551047p");
      await page.click('#conteudo > div.logon > form > table > tfoot > tr > td > input[type=submit]');
      
      await page.goto('https://sig.ifrs.edu.br/sigaa/portais/discente/discente.jsf');
      
      await page.click('#menu_form_menu_discente_j_id_jsp_925609363_95_menu > table > tbody > tr > td:nth-child(1)');
      await page.click('#cmSubMenuID1 > table > tbody > tr:nth-child(1)');
      await page.goto('https://sig.ifrs.edu.br/sigaa/ensino/tecnico_integrado/boletim/selecao.jsf');
      await page.click('#form > table > tbody > tr.linhaImpar > td:nth-child(3) > a');
      await page.screenshot({path: 'buddy-screenshot.png'});
      var a = await page.evaluate("document.querySelector('#relatorio').innerHTML");
      await browser.close();
      return a;

  },
  login: async function (user , senha) {
    console.log("user: " + user.substr(-20,6)+"******" + " senha: " + senha.substr(-20,4)+"****" );
    try{
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('https://sig.ifrs.edu.br/sigaa/verTelaLogin.do');
      await page.type('#conteudo > div.logon > form > table > tbody > tr:nth-child(1) > td > input[type=text]', user);
      await page.type('#conteudo > div.logon > form > table > tbody > tr:nth-child(2) > td > input[type=password]', senha);
      await page.click('#conteudo > div.logon > form > table > tfoot > tr > td > input[type=submit]');
      
      await page.goto('https://sig.ifrs.edu.br/sigaa/portais/discente/discente.jsf');
     var a = await page.evaluate("document.querySelector('#info-usuario > p.usuario > span').innerHTML");

     var b = await page.evaluate("document.querySelector('#agenda-docente > table > tbody > tr:nth-child(2) > td:nth-child(2)').innerHTML");

      await browser.close();
      var c = {
        'nome':a,
        'turma':b
      }
      return c;

    }catch{
      return 'erro'
    }
  }

}
async function a(){

}
//a();
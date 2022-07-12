<h1>projeto18-valex</h1>
<p>API de cartões de benefícios com TypeScript</p>
<div style="display: flex">
  <img align="center" alt="React" height="30" width="70" src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white">
  <img align="center" alt="React" height="30" width="70" src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge">
  <img align="center" alt="React" height="30" width="80" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
  <img align="center" alt="React" height="30" width="90" src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white">
  <img align="center" alt="React" height="30" width="90" src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white">
</div>
<br>
<p>Nesse projeto, foi construída uma API que da suporte a um sistema de cartões de benefício, associando um cartão a um funcionário de uma empresa, além de oferecer suporte ao controle de recargas e compras desse cartão em estabelecimentos cadastrados.</p>

<h1>Fluxo:</h2>

<h3>Criação do cartão (post para rota "/card"):</h3>
<p>headers: X-API-KEY: "api key da empresa cadastrada"</p>
<p>body:
  {
    "employeeId":number,
    "isVirtual":boolean,
    "type":"string
  }
</p>

  <p>OBS: o CVV será entregue na criação do cartão</p>
  
<hr>
  
<h3>informações do usuário (get para rota "/employee-cards/:employeeId")</h3>

<hr>

<h3>Ativação do cartão (post para rota "/activate-card")</h3>
<p>body:
  {
    "id":number,
    "CVV":string,
    "password":string
  }
</p>

<hr>

<h3>Bloquear/desbloquear cartão (post para rota "/block-card"/"unlock-card"):</h3>
<p>body:
  {
    "id":number,
    "password":string
  }
</p>

<hr>

<h3>Informações do cartão (get para rota "/balance-card?id=cardId&password=password")</h3>

<hr>

<h3>Recarregar cartão (post para rota "/recharge"):</h3>
<p>headers: X-API-KEY: "api key da empresa cadastrada"</p>
<p>body:
  {
    "cardId":number,
    "amount":number
  }
</p>

<hr>

<h3>Comprar (post para rota "/payment"):</h3>

<p>body:
  {
    "cardId":number,
    "businessId":number,
    "amount":number,
    "password":string
  }
</p>


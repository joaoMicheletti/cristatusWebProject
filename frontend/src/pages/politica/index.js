import React from 'react';

export default function PoliticaDePrivacidade() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: 'auto', color: 'white' }}>
      <h1>Política de Privacidade</h1>

      <p>Atualizado em: {new Date().toLocaleDateString()}</p>

      <p>
        Esta Política de Privacidade descreve como coletamos, usamos e protegemos suas informações ao utilizar nossa
        plataforma.
      </p>

      <h2>1. Informações que coletamos</h2>
      <p>
        Podemos coletar informações fornecidas por você diretamente, como nome, email e informações públicas do seu
        perfil no Facebook ou Instagram ao utilizar o login social.
      </p>

      <h2>2. Como usamos suas informações</h2>
      <ul>
        <li>Para identificar você como usuário da plataforma</li>
        <li>Para melhorar sua experiência dentro da aplicação</li>
        <li>Para fins de autenticação e segurança</li>
      </ul>

      <h2>3. Compartilhamento de dados</h2>
      <p>
        Seus dados não são vendidos. Podemos compartilhar suas informações apenas com serviços autorizados que auxiliam
        na operação da plataforma, respeitando sempre a confidencialidade.
      </p>

      <h2>4. Seus direitos</h2>
      <p>
        Você pode solicitar a exclusão ou correção de seus dados a qualquer momento entrando em contato conosco. Também
        pode revogar seu consentimento de uso dos dados a qualquer momento.
      </p>

      <h2>5. Cookies</h2>
      <p>
        Utilizamos cookies apenas para funcionalidades básicas da aplicação, sem fins publicitários ou de rastreamento
        de terceiros.
      </p>

      <h2>6. Segurança</h2>
      <p>
        Adotamos medidas de segurança técnicas e organizacionais adequadas para proteger seus dados contra acessos não
        autorizados, alteração ou divulgação indevida.
      </p>

      <h2>7. Contato</h2>
      <p>
        Caso tenha dúvidas sobre esta política, entre em contato pelo e-mail: <strong>jv604014@gmail.com</strong>
      </p>
    </div>
  );
};


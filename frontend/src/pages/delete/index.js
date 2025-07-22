import React from "react";

export default function Deletar(){
    return(
        <>
            <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', color: "white" }}>
                <h1>Exclusão de Dados do Usuário</h1>
                <p>
                    De acordo com as políticas da Meta, LGPD (Lei Geral de Proteção de Dados) e GDPR, respeitamos seu direito de solicitar a exclusão das suas informações armazenadas em nossa plataforma.
                </p>

                <h2>📌 Como solicitar a exclusão?</h2>
                <p>
                    Se você realizou login em nossa plataforma utilizando sua conta do Facebook ou Instagram e deseja excluir seus dados:
                </p>
                <ol>
                    <li>Envie um e-mail para <strong>privacidade@acasaprime1.com.br</strong> com o assunto <strong>"Excluir meus dados"</strong>.</li>
                    <li>Informe o e-mail vinculado à sua conta do Facebook ou Instagram.</li>
                    <li>Nos comprometemos a realizar a exclusão de todos os dados pessoais em até <strong>7 dias úteis</strong>.</li>
                </ol>

                <h2>📁 Quais dados serão excluídos?</h2>
                <ul>
                    <li>Identificadores de conta vinculados ao Facebook ou Instagram</li>
                    <li>Dados de sessão</li>
                    <li>Conteúdos publicados via API em nome do usuário</li>
                    <li>Informações pessoais associadas à conta</li>
                </ul>

                <p>
                    Para mais informações sobre como tratamos os seus dados, acesse nossa <a href="https://acasaprime1.com.br/politica-de-privacidade" target="_blank" rel="noreferrer">Política de Privacidade</a>.
                </p>

                <p>
                    Em caso de dúvidas ou dificuldades, entre em contato com nossa equipe de suporte através do WhatsApp: <strong>(11) 99999-9999</strong>.
                </p>

                <p style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#555' }}>
                    Última atualização: 21 de julho de 2025
                </p>
            </div>
        </>
    );
}
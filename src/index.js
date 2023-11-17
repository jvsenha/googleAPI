// Importação de módulos
import dotenv from "dotenv";
dotenv.config();
import { google } from 'googleapis';
import express from 'express';
import fs from "fs";
import multer from 'multer';
import cors from 'cors';
import { Readable } from 'stream';
import credentials from '../credentials.json' assert { type: 'json' };
import { OAuth2Client } from 'google-auth-library';
import bodyParser from 'body-parser';

// Configuração do servidor Express
const app = express();

// Configuração do middleware de análise de corpo da solicitação
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Porta do servidor
const PORT = process.env.PORT || 8000;

// Configuração de CORS
const corsOptions = {
  origin: '*', // A origem permitida (substitua pelo seu próprio domínio)
  methods: 'GET,POST,DELETE', // Métodos permitidos
};
app.use(cors(corsOptions));

// Configuração do cliente OAuth2
const oauth2Client = new OAuth2Client({
  clientId: credentials.web.client_id,
  clientSecret: credentials.web.client_secret,
  redirectUri: credentials.web.redirect_uris[0],
});

// Leitura das credenciais salvas, se existirem
try {
  const creds = fs.readFileSync("creds.json");
  oauth2Client.setCredentials(JSON.parse(creds));
} catch (err) {
  console.log("No creds found");
}


// Rota para iniciar o processo de autorização com o Google
app.get("/auth/google", (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/drive"
    ],
  });
  res.redirect(url);
});

// Rota para tratar o redirecionamento após a autorização do Google
app.get("/google/redirect", async (req, res) => {
  try {
    const { code } = req.query;
    const { tokens: authTokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(authTokens);
    fs.writeFileSync("creds.json", JSON.stringify(authTokens));
    res.send("Sucesso");
  } catch (error) {
    console.error("Erro ao obter tokens de acesso:", error);
    res.status(500).send("Erro ao obter tokens de acesso.");
  }
});

// Função para atualizar o token de acesso usando o token de atualização
async function refreshAccessToken() {
  const { refresh_token } = JSON.parse(fs.readFileSync("creds.json"));
  const { tokens: authTokens } = await oauth2Client.refreshToken(refresh_token);
  oauth2Client.setCredentials(authTokens);
  fs.writeFileSync("creds.json", JSON.stringify(authTokens));
}


async function makeRequest() {
  try {
    // Tente fazer a solicitação
  } catch (error) {
    if (error.message === 'invalid_grant') {
      // O token de acesso expirou, atualize-o
      await refreshAccessToken();
      // Tente a solicitação novamente
    } else {
      // Outro erro ocorreu, lidar com isso
    }
  }
}

// Função para criar uma pasta no Google Drive
async function criarPastaNoDrive(pastaCliente, oauth2Client) {
  const drive = google.drive({ version: 'v3', auth: oauth2Client });

  const fileMetadata = {
    name: pastaCliente,
    mimeType: 'application/vnd.google-apps.folder',
  };

  try {
    const response = await drive.files.create({
      resource: fileMetadata,
      fields: 'id',
    });
    return response.data.id;
  } catch (err) {
    console.error('Erro ao criar a pasta no Google Drive:', err.message);
    return null;
  }
}

// Rota para criar a pasta no Google Drive
app.post('/cadastrarPastaNoDrive', async (req, res) => {
  try {
    const { pastaCliente } = req.body;

    if (!pastaCliente) {
      res.status(400).send('O nome da pasta não foi fornecido.');
      return;
    }

    const pastaId = await criarPastaNoDrive(pastaCliente, oauth2Client);

    if (pastaId) {
      res.send(pastaId);
    } else {
      res.status(500).send('Erro ao criar a pasta no Google Drive.');
    }
  } catch (error) {
    console.error('Erro ao criar a pasta no Google Drive:', error);
    res.status(500).send('Erro ao criar a pasta no Google Drive.');
  }
});

// Função para criar uma subpasta no Google Drive
async function criarSubPasta(pastaCliente, subPasta, oauth2Client) {
  const drive = google.drive({ version: 'v3', auth: oauth2Client });

  const fileMetadata = {
    name: subPasta,
    mimeType: 'application/vnd.google-apps.folder',
    parents: [pastaCliente], // Especifica a pasta pai
  };

  try {
    const response = await drive.files.create({
      resource: fileMetadata,
      fields: 'id',
    });
    return response.data.id;
  } catch (err) {
    console.error('Erro ao criar a subpasta no Google Drive:', err.message);
    return null;
  }
}

// Rota para criar a subpasta no Google Drive
app.post('/subPasta/:pastaCliente', async (req, res) => {
  try {
    const { pastaCliente } = req.body;
    const { subPasta } = req.params;

    if (!pastaCliente) {
      res.status(400).send('O nome da subpasta não foi fornecido.');
      return;
    }

    const subPastaId = await criarSubPasta(pastaCliente, subPasta, oauth2Client);

    if (subPastaId) {
      res.send(subPastaId);
    } else {
      res.status(500).send('Erro ao criar a subpasta no Google Drive.');
    }
  } catch (error) {
    console.error('Erro ao criar a subpasta no Google Drive:', error);
    res.status(500).send('Erro ao criar a subpasta no Google Drive.');
  }
});

// Função para formatar o tamanho do arquivo
function formatFileSize(bytes) {
  if (bytes < 1024) {
    return bytes + ' bytes';
  } else if (bytes < 1048576) {
    return (bytes / 1024).toFixed(2) + ' KB';
  } else {
    return (bytes / 1048576).toFixed(2) + ' MB';
  }
}

// Configuração do armazenamento para o multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Rota para upload de arquivos para uma pasta no Google Drive
app.post('/upload/:pastaCliente', upload.array('files', 5), async (req, res) => {
  const drive = google.drive({ version: 'v3', auth: oauth2Client });

  const folderName = req.params.pastaCliente;

  try {
    // Pesquisa a pasta pelo nome
    const responses = [];
    const folderQuery = `name='${folderName}' and mimeType='application/vnd.google-apps.folder'`;
    const folders = await drive.files.list({
      q: folderQuery,
      fields: 'files(id)',
    });

    if (folders.data.files.length > 0) {
      const folderId = folders.data.files[0].id;

      // Loop através dos arquivos enviados
      for (const file of req.files) {

        const fileMetadata = {
          name: file.originalname,
          parents: [folderId],
        };

        // Cria um stream legível a partir do Buffer
        const readableStream = new Readable();
        readableStream.push(file.buffer);
        readableStream.push(null);

        const media = {
          mimeType: file.mimetype,
          body: readableStream,
        };

        const response = await drive.files.create({
          resource: fileMetadata,
          media: media,
          fields: 'id,name,size,webViewLink',
        });

        const fileId = response.data.id;
        const fileName = response.data.name;
        const fileSize = response.data.size;
        const webViewLink = response.data.webViewLink;

        responses.push({
          fileId,
          fileName,
          fileSize,
          webViewLink,
        });

        console.log(`Arquivo ${fileName}`);
        console.log(`ID: ${fileId}`);
        console.log(`Tamanho:${fileSize}`);
        console.log(`Link:${webViewLink}`);

        // Aqui, você pode armazenar informações sobre os arquivos no banco de dados ou responder de acordo.
      }
      res.json({ message: 'Arquivos carregados com sucesso', success: true, responses });
    } else {
      console.error('Pasta não encontrada.');
      res.status(500).send('Pasta não encontrada.');
    }
  } catch (error) {
    console.error('Erro ao carregar os arquivos:', error);
    res.status(500).send('Erro ao carregar os arquivos.');
  }
});

// Função para listar arquivos dentro de uma pasta no Google Drive
async function listarArquivos(pastaId, oauth2Client) {
  const drive = google.drive({ version: 'v3', auth: oauth2Client });

  try {
    const response = await drive.files.list({
      q: `'${pastaId}' in parents`,
      fields: 'files(id, name, webViewLink, size)',
    });

    const arquivos = response.data.files;

    console.log('Arquivos na pasta:');
    arquivos.forEach((arquivo) => {
      console.log('ID:', arquivo.id);
      console.log('Nome:', arquivo.name);
      console.log('Tamanho:', arquivo.size);
      console.log('Link:', arquivo.webViewLink);
      console.log('----------------------');
    });

    return arquivos;
  } catch (err) {
    console.error('Erro ao listar arquivos na pasta no Google Drive:', err.message);
    return [];
  }
}

// Função para obter o ID de uma pasta por nome
async function pastaNome(nomePasta, oauth2Client) {
  const drive = google.drive({ version: 'v3', auth: oauth2Client });

  try {
    const response = await drive.files.list({
      q: `name='${nomePasta}' and mimeType='application/vnd.google-apps.folder'`,
      fields: 'files(id)',
    });

    if (response.data.files.length > 0) {
      return response.data.files[0].id;
    } else {
      // Corrigido para retornar um objeto com a propriedade id como null
      return { id: null };
    }
  } catch (err) {
    console.error('Erro ao obter o ID da pasta no Google Drive:', err.message);
    // Corrigido para retornar um objeto com a propriedade id como null
    return { id: null };
  }
}

async function handleFileListing(req, res) {
  const { pastaCliente } = req.params;

  if (!pastaCliente) {
    res.status(400).send('O nome da pasta não foi fornecido.');
    return;
  }

  const pastaId = await pastaNome(pastaCliente, oauth2Client);

  if (!pastaId) {
    res.status(404).send('Pasta não encontrada no Google Drive.');
    return;
  }

  const arquivos = await listarArquivos(pastaId, oauth2Client);

  // Corrigido para enviar a resposta correta
  res.json(arquivos);
  console.log(arquivos);
}

// Rota para listar o conteúdo de uma pasta no Google Drive
app.get('/listarArquivos/:pastaCliente', async (req, res) => {
  try {
    await handleFileListing(req, res);
  } catch (error) {
    if (error.message === 'invalid_grant') {
      // O token de acesso expirou, atualize-o
      await refreshAccessToken();
      // Tente a solicitação novamente
      await handleFileListing(req, res);
    } else {
      // Outro erro ocorreu, lidar com isso
      console.error('Erro ao listar o conteúdo da pasta no Google Drive:', error);
      res.status(500).send('Erro ao listar o conteúdo da pasta no Google Drive.');
    }
  }
});

// Função para deletar arquivo ou pasta no Google Drive
async function deletar(fileId, oauth2Client) {
  const drive = google.drive({ version: 'v3', auth: oauth2Client });

  try {
    await drive.files.delete({ fileId });
    console.log('Arquivo ou pasta excluído com sucesso');
  } catch (err) {
    console.error('Erro ao excluir arquivo ou pasta:', err.message);
  }
}

// Rota para excluir arquivo ou pasta no Google Drive
app.delete('/deletar/:fileId', async (req, res) => {
  try {
    const { fileId } = req.params;
    console.log(fileId);

    if (!fileId) {
      res.status(400).send('O ID do arquivo ou pasta não foi fornecido.');
      return;
    }

    await deletar(fileId, oauth2Client);
    console.log('Arquivo ou pasta excluído com sucesso');
  } catch (error) {
    console.error('Erro ao excluir arquivo ou pasta no Google Drive:', error);
    res.status(500).send('Erro ao excluir arquivo ou pasta no Google Drive.');
  }
});

// Rota para download de arquivo do Google Drive
app.get('/download/:fileId/:nomeDocumento', async (req, res) => {
  try {
    const fileId = req.params.fileId;
    const nomeDocumento = req.params.nomeDocumento;

    // Cria uma instância da biblioteca googleapis para interagir com a API do Google Drive
    const drive = google.drive({ version: 'v3', auth: oauth2Client });

    // Usa a função files.get para obter informações sobre o arquivo, incluindo o seu conteúdo
    const file = await drive.files.get({ fileId, alt: 'media' }, { responseType: 'stream' });

    // Determina o tipo de conteúdo com base na extensão do nome do arquivo
    const extensao = nomeDocumento.split('.').pop();
    let tipoConteudo = 'application/octet-stream';

    // Mapeia extensões comuns para tipos de conteúdo
    const tiposDeConteudoPorExtensao = {
      pdf: 'application/pdf',
      doc: 'application/msword',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      xls: 'application/vnd.ms-excel',
      xlsx: 'application/vnd.openxmlformats',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
    };

    if (extensao in tiposDeConteudoPorExtensao) {
      tipoConteudo = tiposDeConteudoPorExtensao[extensao];
    }

    // Configurar o cabeçalho de resposta para o tipo de conteúdo do arquivo
    res.setHeader('Content-Type', tipoConteudo);

    // Configurar o cabeçalho de resposta para permitir o download do arquivo com o nome desejado
    res.setHeader('Content-Disposition', `attachment; filename="${nomeDocumento}"`);

    // Enviar o conteúdo do arquivo como resposta
    file.data
      .on('end', () => {
        console.log(`Arquivo ${nomeDocumento} enviado com sucesso.`);
      })
      .on('error', (err) => {
        console.error('Erro ao enviar o arquivo:', err);
        res.status(500).send('Erro ao enviar o arquivo.');
      })
      .pipe(res);
  } catch (error) {
    console.error('Erro ao fazer o download do arquivo:', error);
    res.status(500).send('Erro ao fazer o download do arquivo.');
  }
});


app.listen(PORT, () => {
  console.log("Server started on port 8000");
});
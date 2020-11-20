import api from '../Api';

const CRUD = {
  getTransactions: () => {
    api
      .get('/')
      .then((response) => {
        return response.data;
      })
      .catch((error) => console.log(error, 'Não pode retornar dados.'));
  },

  receive: (_, data) => {
    console.log('executou');
    api
      .post('/', data)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err, ' Dados não puderam ser enviados');
      });
  },
  deleteTransaction: (id, _) => {
    api
      .delete(`/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(`${err} Não foi possível deletar o cadastro`);
      });
  },

  update: (id, data) => {
    api
      .patch(`/${id}`, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(`${err} Não foi possível atualizar o cadastro`);
      });
  },
};

export default CRUD;

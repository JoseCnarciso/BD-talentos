<template>
    <form @submit.prevent="handleSubmit" class="form-new">
      <h1>cadastro de talento</h1>
  
      <label for="name">Nome Completo</label>
      <input id="name" v-model="name" />
      {{ errors.name }}
  
      <label for="email">Email</label>
      <input id="email" v-model="email" />
      {{ errors.email }}
  
      <label for="date">Data de nascimento</label>
      <input type="date" id="date" v-model="date_birth" />
  
      <label for="phone">Whatsapp</label>
      <input id="phone" v-model="phone" />
  
      <label for="area">Área de interesse</label>
      <select v-model="area">
        <option value="frontend">Frontend</option>
        <option value="backend">Backend</option>
        <option value="fullstack">Fullstack</option>
      </select>
      {{ errors.area }}
  
      <label for="nivel">Nível</label>
      <select v-model="nivel">
        <option value="junior">Junior</option>
        <option value="pleno">Pleno</option>
        <option value="senior">Senior</option>
      </select>
  
      <p>Selecione suas habilidades</p>
  
      {{ skills.length }}
  
      <div v-if="area === 'frontend' || area === 'fullstack'">
        <label><input type="checkbox" v-model="skills" value="HTML" />HTML</label>
        <label><input type="checkbox" v-model="skills" value="CSS" /> CSS</label>
        <label><input type="checkbox" v-model="skills" value="JAVASCRIPT" /> JAVASCRIPT</label>
        <label><input type="checkbox" v-model="skills" value="VUE" /> VUE</label>
      </div>
  
      <div v-if="area === 'backend' || area === 'fullstack'">
        <label><input type="checkbox" v-model="skills" value="Node" />Node</label>
        <label><input type="checkbox" v-model="skills" value="Php" /> Php</label>
        <label><input type="checkbox" v-model="skills" value="Laravel" /> Laravel</label>
        <label><input type="checkbox" v-model="skills" value="Java" /> Java</label>
      </div>
  
      <label>Carta de apresentação</label>
      <textarea v-model="apresentation"></textarea>
  
      <button type="submit">Cadastrar</button>
    </form>
  </template>
  
  <script>
  import * as yup from 'yup';
  import { captureErrorYup } from '../../../utils/captureErrorYup';
  import apiConfig from '../../../services/api';
  
  export default {
    data() {
      return {
        name: '',
        email: '',
        date_birth: '',
        phone: '',
        area: '',
        nivel: '',
        skills: [],
        apresentation: '',
        errors: {},
      };
    },
    methods: {
        async handleSubmit() {
      try {
        // Montar o schema de validação
        const schema = yup.object().shape({
          name: yup.string().required('O nome é obrigatório').min(10, 'O nome é pequeno demais'),
          email: yup.string().email('Email inválido').required('Email é obrigatório'),
          area: yup.string().required('A área é obrigatória'),
        });

        // Passar os dados para validação
        await schema.validate(
          {
            name: this.name,
            email: this.email,
            area: this.area,
          },
          { abortEarly: false }
        );

        // Montar o corpo da requisição
        const requestData = {
          name: this.name,
          email: this.email,
          date_birth: this.date_birth,
          phone: this.phone,
          area: this.area,
          nivel: this.nivel,
          skills: this.skills,
          bio: this.apresentation,
        };

        // Fazer a chamada à API para cadastrar os dados usando fetch
        const response = await fetch('http://localhost:3333/talentos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });

        if (response.status === 201) {
          alert('CADASTRADO com sucesso');
        } else {
          alert('Houve um erro ao cadastrar');
        }
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          // Certificar-se de que foi um erro do yup
          this.errors = captureErrorYup(error);
        }
      }
    },
      // Outros métodos, como o watch para limpar as skills
    },
    // Outras opções, como computed properties e lifecycle hooks
  };
  </script>
  
  <style scoped>
  .form-new {
    display: flex;
    flex-direction: column;
  }
  </style>
  
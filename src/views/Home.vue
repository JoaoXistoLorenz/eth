<template>
  <el-row v-loading="loading">
    <Topbar :page="1"/>
    <BackTop/>
    <el-main ref="main" class="main">

      <!-- Titulo -->
      <div class="titulo-principal">
        Soluções de Escalabilidade
        <div class="titulo-secundario">
          <font-awesome-icon icon="layer-group" class="color-principal"/>
          Encontre as principais Pontes e Layers 2 da Ethereum!
        </div>
      </div>

      <!-- Botões -->
      <el-row class="scalability-row">
        <el-radio-group v-model="tipolista" size="mini" style="float: left; padding-top: 15px" fill="#635DFF">
          <el-radio-button :label="1">
            <font-awesome-icon icon="table-cells-large"/>
          </el-radio-button>
          <el-radio-button :label="2">
            <font-awesome-icon icon="list"/>
          </el-radio-button>
        </el-radio-group>
        <el-button v-for=" (t) in tiposEscalabilidade" :key="t.key+'btn'" class="mt-5px" :class="tipo === parseInt(t.key) ? 'btn-scalability-ativo' : 'btn-scalability'" @click="setTipo(parseInt(t.key))">{{t.value}}</el-button>
      </el-row>

      <!-- Filtros -->
      <el-row class="filters-row">
        <el-card :body-style="{ padding: '20px' }">
          <el-row class="row-primary-filter">
            <el-row class="row-input-search">
              <div class="filtro">
                Filtre por uma plataforma:
              </div>
              <el-input placeholder="Procure uma plataforma!" v-model="procurar" @input="procularSolucao()">
                <el-button slot="prepend">
                  <font-awesome-icon icon="search" class="color-principal"/>
                </el-button>
              </el-input>
            </el-row>
            <el-row class="row-blockchain">
              <div class="filtro"> 
                Filtre por uma Blockchain:
              </div>
              <el-select v-model="blockchain" placeholder="Filtre por uma Blockchain" style="width:100%">
                <el-option
                  v-for="blockchain in blockchains"
                  :key="blockchain.id+'blockchain'"
                  :label="blockchain.nome"
                  :value="blockchain.id">
                </el-option>
              </el-select>
            </el-row>
            <el-row class="small-filtro">
              <div class="filtro"> 
                Filtre por técnica:
              </div>
              <el-select v-model="tipo" @change="procularSolucao()" placeholder="Filtre por uma Blockchain" style="width:100%">
                <el-option
                  v-for="tecnica in tiposEscalabilidade"
                  :key="parseInt(tecnica.key)+'tecnica'"
                  :label="tecnica.value"
                  :value="parseInt(tecnica.key)">
                </el-option>
              </el-select>
            </el-row>
          </el-row>
        </el-card>
      </el-row>

      <!-- Cards -->
      <el-row class="cards-row">
        <el-row v-if="tipolista === 1">
          <el-col v-for="plataforma in plataformas" :key="plataforma.id+'plataforma'" class="p-10px" :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
            <CardPrincipal :plataforma="plataforma"/>
          </el-col>
        </el-row>
        <el-row v-if="tipolista === 2 && plataformas.length > 0" style="margin: 10px">
          <TablePrincipal :plataformas="plataformas"></TablePrincipal>
        </el-row>
        <SemDados v-if="plataformas.length === 0" class="sem-dados"/>
      </el-row>
    </el-main>
  </el-row>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import CardPrincipal from '../components/CardPrincipal.vue';
  import BackTop from '../components/BackTop.vue';
  import Topbar from '../components/Topbar.vue';
  import SemDados from '../components/SemDados.vue';
  import TablePrincipal from '../components/TablePrincipal.vue';
  import { TiposEscalabilidade, Blockchains } from '../utils/enum';

  @Component({
    name: 'Home',
    components: {Topbar, CardPrincipal, BackTop, SemDados, TablePrincipal}
  })

  export default class Home extends Vue {
    public loading = true;
    public procurar = '';
    public blockchain = 1;
    public plataformasImutavel: any = [];
    public plataformas: any = [];
    public tipo = 1;
    public blockchains: any = Object.entries(Blockchains).map(([key, value]) => ({ id: parseInt(key), nome: value }) as any );
    public tiposEscalabilidade = Object.entries(TiposEscalabilidade).map(([key, value]) => ({ key, value }));
    public tipolista = 1;


    public setTipo(num: number) {
      this.tipo = num;
      this.procularSolucao();
    }

    public setPlataformas() {
      const plataforma1: any = {
        id: 1,
        tipo: 4,
        imagem: 'cartesi.webp',
        nome: 'Cartesi',
        descricao: "Is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the e printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
        url: 'https://www.google.com',
      }
      const plataforma2: any = {
        id: 2,
        tipo: 2,
        imagem: 'op.png',
        nome: 'Optimism',
        descricao: "Is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the e printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
        url: 'https://www.google.com',
      }

      const plataforma3: any = {
        id: 3,
        tipo: 4,
        imagem: 'arbitrum.png',
        nome: 'Arbitrum',
        descricao: "Is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the e printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
        url: 'https://www.google.com',
      }

      let id = 1;
      for (let index = 0; index < 10; index++) {
        plataforma1.id = parseInt(id.toString());
        id = id + 1;
        plataforma2.id = parseInt(id.toString());
        id = id + 1;
        plataforma3.id = parseInt(id.toString());
        id = id + 1;
        this.plataformasImutavel.push({...plataforma1});
        this.plataformasImutavel.push({...plataforma2});
        this.plataformasImutavel.push({...plataforma3});
        this.plataformas.push({...plataforma1});
        this.plataformas.push({...plataforma2});
        this.plataformas.push({...plataforma3});
      }
    }

    public procularSolucao() {
      this.blockchain = 1;
      if (this.procurar !== '') {
        this.plataformas = this.plataformasImutavel.filter((item: any) => item.nome.toUpperCase().includes(this.procurar.toUpperCase()));
      } else {
        this.plataformas =  [...this.plataformasImutavel];
      }
      if (this.tipo !== 1) {
        this.plataformas = this.plataformas.filter((item: any) => item.tipo === this.tipo);
      }
    }

    public mounted() {
      this.loading = true;
      this.setPlataformas();
      this.loading = false;
    }
  }
</script>

<style lang="scss">
.filtro {
  padding-bottom: 10px;
  font-weight: bold;
}
</style>
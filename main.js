var eventBus  = new Vue();

Vue.component('persona', {
    props: {
        persona: {
            type:Object,
            required:true
        },
    },
    template: `<div>
                    <span> {{ persona.nombre }} - </span> 
                    <small>{{persona.genero}} -</small> 
                    <button @click="eliminarPersona(persona)" >Eliminar</button>
                </div>`,
                methods: {
                    eliminarPersona(persona){
                        //this.$emit("eliminarPersona",persona.nombre)
                        eventBus.$emit("eliminarPersonaPorNombre", persona.nombre);
                    }
            }
 
});

Vue.component('personas', {
    props: {
        personas:{
            type:Array,
            required:true
        }
    },
    template: `<ul>
                    <li v-for="persona in personas"> 
                        <persona v-bind:persona="persona" @eliminarPersona='removerPersona'></persona> 
                    </li>
                </ul>`,
    methods: {
        removerPersona: function(nombrePersona){
           var indice =  this.personas.findIndex(x=>x.nombre == nombrePersona );
           this.$emit('remover-persona-por-indice',indice)

        }
    }
});

var vm = new Vue({
    el:'main',
    data:{
        tareas :[
            {nombre:"comprar leche", completada:false},
            {nombre:"aprender vue", completada:false},
            {nombre:"aprender componentes", completada:false},
         ],
         personas: [
            {nombre:"Rene Gonzalez", genero:"Masculino"},
            {nombre:"Stanley Lara", genero:"Masculino"},
            {nombre:"Margarita Fernandez", genero:"Femenino"},
        ],
          
    },
    
    methods:{
        removerPersonaPorIndice:function(indice){
            this.personas.splice(indice,1);
        }
    },
    mounted:function(){
        //Escucuchando por el evento.   
            eventBus.$on("eliminarPersonaPorNombre", (nombrePersona)=>{   
            var indice =  this.personas.findIndex(x=>x.nombre == nombrePersona );
            this.personas.splice(indice,1);

        })
    } ,
})

// Vue.component('persona', {
//     // props: ['nombre', 'edad'],
//     props: {
//         nombre:{
//             type:String,
//             default:"Sin nombre"
//         },
//         edad:[Number,String]
//     },
//     template: `<div><h1> {{ nombre }}- {{edad}}  </h1><button @click="cambiarProp">Cambiar Prop</button></div>`,
//     methods: {
//         cambiarProp() {

//             this.nombre = this.nombre.toUpperCase();
//         }
//     }
// });

//Creacion de componente
// Vue.component('usuarios',{
//     props:[],
//     template:"#usersTemplate",
//     data:function(){
//         return {
//             usuarios:[],
//             usuariosBorrados:[]
//         }

//     },
//     methods:{
//         borrarUsuario:function(usuario){
//             var indice = this.usuarios.findIndex(x=>x.id == usuario.id);
//             var usuarioEliminado = this.usuarios.splice(indice,1)[0]
//             this.usuariosBorrados.push(usuarioEliminado);
//         }
//     },
//     mounted:function(){
//         axios.get("https://jsonplaceholder.typicode.com/users")
//         .then(response=>{
//             this.usuarios =  response.data
//         })
//     }
// })


// Vue.component('tareas',{
//     props:['tareas','titulo'],
//     template:`
//         <ul>
//             <h1>{{titulo}}</h1>
//             <li v-for="tarea in tareas">{{tarea.nombre}}</li>
//         </ul>
//     `,
//     data:function(){
//         return {
//         }
//     }
// })



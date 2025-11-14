import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import type Usuario from "../../models/Usuario";
import { useNavigate } from "react-router-dom";
import { cadastrarUsuario } from "../../services/Service";
import { ClipLoader } from "react-spinners";

function Cadastro() {

  // Objeto responsável por redirecionar o usuário para uma outra rota
  const navigate = useNavigate();

  // Controlar a exibição do Loader (animação de carregamento)
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  // Validar a digitação da senha do usuário
  const [confirmarSenha, setConfirmarSenha] = useState<string>("");

  // Guardar os dados do usuário
  const [usuario, setUsuario] = useState<Usuario>({
      id: 0,
      nome: "",
      usuario: "",
      senha: "",
      foto: ""
  })

  useEffect( () => {
    if(usuario.id !== 0){
      retornar();
    }
  }, [usuario])

  function retornar(){
    navigate("/login");
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>){
    setUsuario({
        ...usuario,
        [e.target.name]: e.target.value
    })
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>){
    setConfirmarSenha(e.target.value);
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>){
    e.preventDefault();

    setIsLoading(true);

    if(confirmarSenha === usuario.senha && usuario.senha.length >= 8){

        try{

          await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario);
          alert('Usuário cadastrado com sucesso!');

        }catch(error){
          alert('Erro ao cadastrar o usuário!');
        }

    }else{
      alert("Dados do usuário inconsistentes! Verifique as informações do cadastro.")
      setUsuario({
        ...usuario,
        senha: ''
      });
      setConfirmarSenha('');
    }

    setIsLoading(false);
  }

  console.log(JSON.stringify(usuario));
  console.log("Confirmar Senha: " + confirmarSenha);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font bold" >
        <div className="bg-[url('https://ik.imagekit.io/qiazjnea4/bgblogpessoal.png?updatedAt=1763124274880')] lg:block hidden bg-no-repeat 
      w-full min-h-screen bg-cover bg-center"
        ></div>
        <form className="flex justify-center items-center flex-col w-2/3 gap-3"
            onSubmit ={cadastrarNovoUsuario}
        >
          <h2 className="text-(--color-radical-red-900) text-5xl">Cadastrar</h2>
          <div className="flex flex-col w-full">
            <label htmlFor="nome" className="text-(--color-radical-red-900)">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome"
              className="border-2 border-(--color-radical-red-800) rounded p-2"
              value={usuario.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="usuario" className="text-(--color-radical-red-900)">Usuario</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Usuario"
              className="border-2 border-(--color-radical-red-800) rounded p-2"
              value={usuario.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="foto" className="text-(--color-radical-red-900)">Foto</label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="Foto"
              className="border-2 border-(--color-radical-red-800) rounded p-2"
              value={usuario.foto}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="senha" className="text-(--color-radical-red-900)">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              className="border-2 border-(--color-radical-red-800) rounded p-2"
              value={usuario.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="confirmarSenha" className="text-(--color-radical-red-900)">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirmar Senha"
              className="border-2 border-(--color-radical-red-800) rounded p-2"
              value={confirmarSenha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
            />
          </div>
          <div className="flex justify-around w-full gap-8">
            <button
              type="reset"
              className="rounded text-white bg-red-400 hover:bg-red-700 w-1/2 py-2"
              onClick={retornar}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded text-white bg-blue-300
                       hover:bg-blue-700 w-1/2 py-2
                       flex justify-center"
            >
              {
                isLoading ?

                <ClipLoader
                    color="#ffffff"
                    size={24}
                />

                :

                <span>Cadastrar</span>

              }
              
            </button>
          </div>
        </form >
      </div >
    </>
  )
}

export default Cadastro
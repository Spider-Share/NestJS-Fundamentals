import { registerAs } from "@nestjs/config";


// é uma maneira genérica de acessar várias propriedades de configurações
// registrado em seu aplicativo
// é útil ao obter variáveis ​​.env ou quando você precisa integrar com muitos diferentes
// objetos de configurações de uma só vez em um único serviço
export default registerAs('coffees', () => ({ // 👈
    foo: 'bar',
    ga_velloso: 'Gabriel Velloso', // 👈
  }));
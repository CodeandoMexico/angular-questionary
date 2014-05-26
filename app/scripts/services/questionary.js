'use strict';

angular.module('questionaryApp')
  .service('Questionary', function Questionary() {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
      questions: [
        {
          identifier : '1.B.1 Características Sociodemográficas',
          grouped    : true,
          questions : [
            {
              title  : 'Edad',
              // help   : 'Escribe el valor de la respuesta',
              type   : 'number',
              body   : {
                value  : null,
              }
            },
            {
              title    : 'Sexo',
              // help     : 'Selecciona uno de los valores',
              type     : 'radio',
              body     : {
                selected_value    : 'Masculino',
                options  : ['Masculino', 'Femenino']
              }
            },
            {
              title    : 'Nivel de estudios',
              // help     : 'Selecciona uno de los valores',
              type     : 'select',
              body     : {
                selected_value    : 'Primaria',
                options  : ['Ninguno', 'Primaria', 'Secundaria / Secundaria Técnica', 'Bachillerato / Preparatoria / Preparatoria Técnica', 'Licenciatura / Ingeniería', 'Maestría ó superior']
              }
            },
            {
              title    : '¿Resides en el D.F.?',
              // help     : 'Selecciona uno de los valores',
              type     : 'radio',
              body     : {
                selected_value    : 'No, vivo en otra entidad',
                options  : ['No, vivo en otra entidad', 'Sí, vivo en el D.F.']
              }
            },
            {
              title    : 'Delegación',
              // help     : 'Selecciona uno de los valores',
              type     : 'select',
              body     : {
                selected_value    : 'Del. 16',
                options  : ['Del. 1', 'Del. 2' ,'Del. 4' ,'Del. 8' ,'Del. 16']
              }
            },
            {
              title    : '¿El negocio ya está en operación?',
              // help     : 'Selecciona uno de los valores',
              type     : 'radio',
              body     : {
                selected_value    : 'No, aún no está operando',
                options  : ['No, aún no está operando', 'Sí, ya está en operación']
              }
            },
            {
              title    : 'Delegación',
              // help     : 'Selecciona uno de los valores',
              type     : 'select',
              body     : {
                selected_value    : 'Del. 1',
                options  : ['Del. 1', 'Del. 2' ,'Del. 4' ,'Del. 8' ,'Del. 16']
              }
            },
          ]
        },
        {
          identifier : '2.A Perfiles',
          grouped    : true,
          questions : [
            {
              title  : '[ORDINAL] La razón principal por la que llevo a cabo este proyecto es porque… ',
              help   : 'Escribe el valor de la respuesta',
              type   : 'order',
              body   : {
                options: [
                  { value: 0, label: 'No hay suficientes oportunidades laborales para encontrar un empleo' },
                  { value: 1, label: 'Prefiero tener mi propia empresa que ser un empleado' },
                  { value: 2, label: 'Quiero generar un impacto positivo en la sociedad y/o medio ambiente' },
                  { value: 3, label: 'Quiero desarrollar mi creatividad' },
                  { value: 4, label: 'Hago lo que más me gusta hacer' },
                  { value: 5, label: 'Tengo algo innovador que es (o será) rentable en el mercado' },
                ]
              }
            },
            {
              title  : '[ORDINAL] El principal objetivo de mi empresa es…',
              help   : 'Escribe el valor de la respuesta',
              type   : 'order',
              body   : {
                options: [
                  { value: 0, label: 'Obtener ingresos para solventar los gastos básicos personales/familiares' },
                  { value: 1, label: 'Tener mi propio negocio sin depender de un tercero' },
                  { value: 2, label: 'Realizar la actividad que más me gusta hacer y vivir de ello' },
                  { value: 3, label: 'Exponer un proyecto artístico' },
                  { value: 4, label: 'Generar un impacto positivo en la población y/o el medio ambiente' },
                  { value: 5, label: 'Realizar un proyecto empresarial innovador y exitoso' },
                ]
              }
            },
            {
              title    : '¿Tu negocio pertenece a alguno de los siguientes sectores?',
              // help     : 'Selecciona uno de los valores',
              type     : 'radio',
              body     : {
                selected_value    : 'Industrias manufactureras',
                options  : ['Industrias manufactureras', 'Comercio', 'Preparación de alimentos y bebidas (restaurantes, puestos y similares) y hoteles', 'Servicios profesionales, técnicos, corporativos, financieros, inmobiliarios, educativos, médicos, de apoyo a negocios y manejo de desechos', 'Culturales y de esparcimiento, deportivos y recreativos', 'Organizaciones con fines altruistas y medio ambientales', 'Agricultura, ganadería, aprovechamiento forestal y pesca', 'Tecnologías de la información y la comunicación', 'Otros', 'No sé']
              }
            },
            {
              title  : '¿Cuántas personas trabajan en la empresa (incluyendo a los dueños)?',
              // help   : 'Escribe el valor de la respuesta',
              type   : 'number',
              body   : {
                value  : null,
              }
            },
            {
              title  : '¿Cuántos dueños (socios) tiene este negocio?',
              // help   : 'Escribe el valor de la respuesta',
              type   : 'number',
              body   : {
                value  : null,
              }
            },

            {
              title  : 'Del total de personas que trabajan en la empresa, ¿cuántos son familiares de los dueños  (incluye: padres, hijos, abuelos, hermanos, tíos, primos, sobrinos, cuñados)?',
              // help   : 'Escribe el valor de la respuesta',
              type   : 'number',
              body   : {
                value  : null,
              }
            },
            {
              title    : '¿El producto/servicio que se ofrece es?',
              // help     : 'Selecciona uno de los valores',
              type     : 'radio',
              body     : {
                selected_value    : 'Es nuevo y distinto a lo que existe y/o el proceso de elaboración/comercialización es innovador',
                options  : ['Es nuevo y distinto a lo que existe y/o el proceso de elaboración/comercialización es innovador', 'En algunas características son diferentes a los de mi competencia o lo ofrezco a personas que no lo tienen', 'Ya existe y es ofrecido por otros' ]
              }
            },
            {
              title    : 'Piensa en las ganancias que tiene tu empresa , imagina que ese monto vale 100, si te ofrecieran un empleo con un salario de 105 ¿qué preferirías?....',
              // help     : 'Selecciona uno de los valores',
              type     : 'radio',
              body     : {
                selected_value    : 'Aceptar el empleo y dejar de trabajar en mi empresa',
                options  : ['Aceptar el empleo y dejar de trabajar en mi empresa', 'No aceptar el empleo y seguir con mi empresa']
              }
            },
          ],
        },
        {
          identifier : '3.A Etapas',
          grouped    : true,
          questions : [
            {
              title  : '¿Cuanto tiempo lleva este proyecto/negocio en operación?',
              // help   : 'Escribe el valor de la respuesta',
              type   : 'number',
              body   : {
                value  : null,
              }
            },
            {
              title  : 'Selecciona las frases que mejor describen los lugares en donde se vende tu producto (puedes seleccionar varias opciones si concuerda con tu perfil)',
              help   : 'Escribe el valor de la respuesta',
              type   : 'checkbox',
              body   : {
                options: [
                  { label: 'La zona cercana a mi punto de venta (cuadra, colonia)', checked: false },
                  { label: 'Se vende en varias colonias de la Ciudad de México (más de una delegación)', checked: false },
                  { label: 'Se vende fuera de la zona del DF y área metropolitana', checked: false },
                  { label: 'Se exporta al extranjero', checked: false },
                  { label: 'Se vende o anuncia en internet', checked: false },
                ]
              }
            },
            {
              title    : '¿Cuál de las siguientes frases describe mejor la manera en la que administro mi negocio?',
              // help     : 'Selecciona uno de los valores',
              type     : 'radio',
              body     : {
                selected_value    : 'Llevo personalmente todas las cuentas de mi negocio sin apuntar nada',
                options  : ['Llevo personalmente todas las cuentas de mi negocio sin apuntar nada', 'Llevo las cuentas de mi negocio a mano, en una libreta en donde apunto los ingresos, gastos, etc.', 'Llevo las cuentas de mi negocio en Excel o un programa similar', 'Hay uno o varios empleados especializados en, o contrato el servicio para, llevar a cabo la contabilidad de la empresa']
              }
            },
            {
              title    : '¿Cuál de las siguientes frases describe mejor la toma de decisiones en la empresa?',
              // help     : 'Selecciona uno de los valores',
              type     : 'radio',
              body     : {
                selected_value    : 'Todas las decisiones del día a día las toma el dueño(s) de la empresa',
                options  : ['Todas las decisiones del día a día las toma el dueño(s) de la empresa', 'En la empresa, además del dueño(s), hay uno o dos empleados de confianza que toman decisiones sobre la operación del negocio', 'En la empresa, además del dueño(s), hay una estructura de decisión mayor a 3 personas']
              }
            },
            {
              title    : '¿El negocio tiene RFC (Registro Federal de Contribuyentes)?',
              // help     : 'Selecciona uno de los valores',
              type     : 'radio',
              body     : {
                selected_value    : 'Sí',
                options  : ['Sí', 'No']
              }
            },
            {
              title    : '¿Cuál es el nivel de respaldo que da la tecnología en tu negocio?',
              // help     : 'Selecciona uno de los valores',
              type     : 'radio',
              body     : {
                selected_value    : 'Ninguna, no se necesita / no tengo recursos',
                options  : ['Ninguna, no se necesita / no tengo recursos', 'Sirve de apoyo para algunos procesos administrativos (procesamiento de nómina, costos, gastos, ventas, etc.)', 'Juega un papel importante en la empresa (en el proceso de elaboración del producto o servicio que ofrece la empresa, además de apoyar la gestión y administración de la empresa)']
              }
            },
            {
              title  : 'Selecciona los insumos con los que cuenta tu negocio o se utilizan para realizar el producto o servicio que ofrece la empresa',
              help   : 'Escribe el valor de la respuesta',
              type   : 'checkbox',
              body   : {
                options: [
                  { label: 'Computadora / Laptop / tablet', checked: false },
                  { label: 'Acepta tarjetas de crédito, depósitos o transferencias bancarias como medios de pago u obtención de recursos', checked: false },
                  { label: 'Programa de cómputo especial para realizar el trabajo (diferente a Excel, Power-Point y Word)', checked: false },
                  { label: 'Ninguna de las anteriores', checked: false },
                ]
              }
            },
            {
              title    : ' ¿Alguna vez has obtenido un crédito para tu negocio de una institución bancaria o similar?',
              // help     : 'Selecciona uno de los valores',
              type     : 'radio',
              body     : {
                selected_value    : 'No, lo solicité pero me rechazaron / No lo he solicitado porque creo que no me lo darían',
                options  : ['No, lo solicité pero me rechazaron / No lo he solicitado porque creo que no me lo darían', 'Sí', 'No, no lo he necesitado pero pienso (o sé) que sí me lo darían']
              }
            },
          ]
        },
        {
          identifier : '4.A.1',
          grouped    : true,
          questions : [
            {
              title  : ' De la siguiente lista selecciona la (o las) prioridad(es) actual(es) que tenga tu empresa. Puedes escoger de 1 a 3 prioridades',
              help   : 'Escribe el valor de la respuesta',
              type   : 'checkbox',
              body   : {
                options: [
                  { label: 'Conseguir financiamiento/ Acceder a instrumentos financieros', checked: false },
                  { label: 'Diseñar o mejorar mi plan de negocios', checked: false },
                  { label: 'Incrementar la productividad/ Mejorar procesos', checked: false },
                  { label: 'Entrar a la formalidad', checked: false },
                  { label: 'Contratar personal', checked: false },
                  { label: 'Capacitar al personal de la empresa', checked: false },
                  { label: 'Expandir mi mercado', checked: false },
                  { label: 'Incorporar tecnología e innovación', checked: false },

                ]
              }
            }
          ]
        },
        {
          identifier : '5.A.1',
          grouped    : true,
          questions : [
            {
              title  : 'Las siguientes frases describen diferentes tipos de empresas, elige la opción que más se identifique con tu empresa.',
              help   : 'Escribe el valor de la respuesta',
              type   : 'radio',
              body     : {
                selected_value    : 'Mi empresa es pequeña, las ganancias que obtengo me alcanzan apenas para los gastos básicos, si tuviera la oportunidad buscaría recursos de otra manera',
                options  : [
                  'Mi empresa es pequeña, las ganancias que obtengo me alcanzan apenas para los gastos básicos, si tuviera la oportunidad buscaría recursos de otra manera',
                  'Mi empresa es igual a muchas otras y/o lo que vendo también lo venden muchos otros, pero aun así puedo obtener ganancias',
                  'Lo que más me gusta de mi negocio, independientemente de las ganancias que tenga, es que me permite hacer lo que más me gusta y ser independiente',
                  'Una parte central de mi empresa es desarrollar la creatividad y/o la expresión artística',
                  'El objetivo central de mi empresa es contribuir para mejorar la situación de un grupo de la población y/o el medio ambiente',
                  'Mi empresa tiene el potencial para crecer rápidamente porque es innovadora'
                  ]
              }
            },
            {
              title  : 'Las siguientes frases describen el estado de desarrollo de distintas empresas, elige la opción que más se identifique con tu proyecto',
              help   : 'Escribe el valor de la respuesta',
              type   : 'radio',
              body     : {
                selected_value    : 'Mi proyecto se encuentra en una etapa inicial o de formación / tiene una estructura administrativa pequeña en donde yo tomo todas las decisiones del día a día',
                options  : [
                  'Mi proyecto se encuentra en una etapa inicial o de formación / tiene una estructura administrativa pequeña en donde yo tomo todas las decisiones del día a día',
                  'Mi proyecto se ha consolidado en su mercado, competimos directamente con las empresas líderes de ese mercado / tiene una estructura administrativa y de decisión compleja y/o con procedimientos formalizados',
                  ]
              }
            }
          ]
        },
        {
          identifier : '2.C.1',
          grouped    : true,
          questions : [
            {
              title  : '[ORDINAL] La razón principal por la que llevo a cabo este proyecto es porque...',
              help   : 'Escribe el valor de la respuesta',
              type   : 'order',
              body   : {
                options: [
                  { value: 0, label: 'No hay suficientes oportunidades laborales para encontrar un empleo' },
                  { value: 1, label: 'Prefiero emprender mi propio negocio que ser un empleado' },
                  { value: 2, label: 'Quiero generar un impacto positivo en la sociedad y/o medio ambiente' },
                  { value: 3, label: 'Quiero desarrollar mi creatividad' },
                  { value: 4, label: 'Hago lo que más me gusta hacer' },
                  { value: 5, label: 'Tengo algo innovador que es (o será) rentable en el mercado' },
                ]
              }
            },
            {
              title  : '[ORDINAL] El principal objetivo de mi empresa será...',
              help   : 'Escribe el valor de la respuesta',
              type   : 'order',
              body   : {
                options: [
                  { value: 0, label: 'Obtener ingresos para solventar los gastos básicos personales/familiares' },
                  { value: 1, label: 'Tener mi propio negocio sin depender de un tercero' },
                  { value: 2, label: 'Realizar la actividad que más me gusta hacer y vivir de ello' },
                  { value: 3, label: 'Exponer un proyecto artístico' },
                  { value: 4, label: 'Generar un impacto positivo en la población y/o el medio ambiente' },
                  { value: 5, label: 'Realizar un proyecto empresarial innovador y exitoso' },
                ]
              }
            },
            {
              title    : '¿Cuál de las siguientes frases describe mejor tu situación laboral-empresarial actual?',
              // help     : 'Selecciona uno de los valores',
              type     : 'radio',
              body     : {
                selected_value    : 'NO tengo empleo y NO tengo otro negocio',
                options  : [
                  'NO tengo empleo y NO tengo otro negocio',
                  'SÍ tengo empleo y NO tengo otro negocio',
                  'NO tengo empleo y SÍ tengo otro negocio',
                  'SÍ tengo empleo y SÍ tengo otro negocio'
                ]
              }
            },
            {
              title    : 'Imagina que ya tienes tu negocio con el cual las ganacias son igual a 100, si te ofrecieran un empleo con un salario de 105 ¿qué preferirías?',
              // help     : 'Selecciona uno de los valores',
              type     : 'radio',
              body     : {
                selected_value    : 'Aceptar el empleo y dejar de trabajar en mi empresa',
                options  : ['Aceptar el empleo y dejar de trabajar en mi empresa', 'No aceptar el empleo y seguir con mi empresa']
              }
            },
            {
              title    : '¿Tu negocio pertenecerá a alguno de los siguientes sectores?',
              // help     : 'Selecciona uno de los valores',
              type     : 'radio',
              body     : {
                selected_value    : 'Industrias manufactureras',
                options  : [
                  'Industrias manufactureras',
                  'Comercio',
                  'Preparación de alimentos y bebidas (restaurantes, puestos y similares) y hoteles',
                  'Servicios profesionales, técnicos, corporativos, financieros, inmobiliarios, educativos, médicos, de apoyo a negocios y manejo de desechos',
                  'Culturales y de esparcimiento, deportivos y recreativos',
                  'Organizaciones con fines altruistas y medio ambientales',
                  'Agricultura, ganadería, aprovechamiento forestal y pesca',
                  'Tecnologías de la información y la comunicación',
                  'Otros',
                  'No sé'
                ]
              }
            },
            {
              title    : '¿El producto/servicio que se ofrecerá será?',
              // help     : 'Selecciona uno de los valores',
              type     : 'radio',
              body     : {
                selected_value    : 'Es nuevo y distinto a lo que existe y/o el proceso de elaboración/comercialización es innovador',
                options  : ['Es nuevo y distinto a lo que existe y/o el proceso de elaboración/comercialización es innovador', 'En algunas características son diferentes a los de mi competencia o lo ofrezco a personas que no lo tienen', 'Ya existe y es ofrecido por otros' ]
              }
            },
            {
              title    : '¿Cuál es el nivel de respaldo que dará la tecnología en tu negocio?',
              // help     : 'Selecciona uno de los valores',
              type     : 'radio',
              body     : {
                selected_value    : 'Ninguna, no se necesitará / no tengo recursos para eso',
                options  : ['Ninguna, no se necesitará / no tengo recursos para eso', 'Servirá de apoyo para algunos procesos administrativos (procesamiento de nómina, costos, gastos, ventas, etc.)', 'Jugará un papel importante en la empresa (en el proceso de elaboración del producto o servicio que ofrece la empresa, además de apoyar la gestión y administración de la empresa)']
              }
            },
          ]
        },
        {
          identifier : '4.C.1',
          grouped    : true,
          questions : [
            {
              title  : 'De la siguiente lista selecciona la (o las) prioridad(es) actual(es) que tenga tu empresa. Puedes escoge de 1 a 3 prioridades.',
              help   : 'Escribe el valor de la respuesta',
              type   : 'checkbox',
              body   : {
                options: [
                  { label: 'Conseguir financiamiento/ Acceder a instrumentos financieros.', checked: true },
                  { label: 'Diseñar o mejorar mi plan de negocios.', checked: true },
                  { label: 'Maximizar la productividad/ Desarrollar procesos.', checked: false },
                  { label: 'Entrar a la formalidad.', checked: false },
                  { label: 'Capacitar al equipo emprendedor/personal de la empresa.', checked: false },
                  { label: 'Expandir mis opciones de mercado.', checked: true },
                  { label: 'Incorporar tecnología e innovación.', checked: true },
                ]
              }
            },
          ]
        },
        {
          identifier : '5.C.1',
          grouped    : true,
          questions : [
            {
              title  : 'Las siguientes frases describen diferentes motivos o maneras de iniciar una empresa, elige la opción que más se identifique con tu proyecto.',
              help   : 'Escribe el valor de la respuesta',
              type   : 'radio',
              body   : {
                selected_value : 'El principal motivo para iniciar mi empresa es tener recursos para cubrir los gastos básicos. Si tuviera la oportunidad buscaría recursos de otra manera.',
                options: [
                  'El principal motivo para iniciar mi empresa es tener recursos para cubrir los gastos básicos. Si tuviera la oportunidad buscaría recursos de otra manera.',
                  'Mi empresa será similar a muchas otras y mi producto ya se vende, pero aun así puedo obtener ganancias.',
                  'Mi negocio me permitirá hacer lo que más me gusta y ser independiente.',
                  'Lo que quiero es desarrollar mi creatividad y/o expresión artística.',
                  'El objetivo central de mi proyecto es contribuir para mejorar la situación de un grupo de la población y/o el medio ambiente.',
                  'Tengo una idea innovadora con el potencial de ser exitosa y rentable.'
                ]
              }
            },
          ]
        },
      ]
    };
  });

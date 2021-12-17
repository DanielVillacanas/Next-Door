import HomeFarmer from "../../images/HomeFarmer.jpg";
import HomeTruck from "../../images/HomeTruck.jpg";
import LogoWhite from "../../images/LogoWhite.svg";
import HeaderPhoto from "../../images/HeaderPhoto.jpg";
import Dani from "../../images/Dani.jpg";
import Alvaro from "../../images/Alvaro.jpg";
import { Link } from "react-router-dom";
import {
  UsersIcon,
  GlobeAltIcon,
  LightningBoltIcon,
  ScaleIcon,
} from "@heroicons/react/outline";

const features = [
  {
    name: "Vendedores por toda España",
    description:
      "Da igual el punto en el que te encuentres de España, alli habra un vendedor de NextDoor.",
    icon: GlobeAltIcon,
  },
  {
    name: "Sin comisiones ocultas",
    description:
      "La confianza de nuestros usuarios y vendedores es importante, no hay comisiones ocultas.",
    icon: ScaleIcon,
  },
  {
    name: "Transacciones instantaneas",
    description:
      "Con la ultima tecnología en nuestra pasarela de pago, vuestras transacciones seran instantaneas ",
    icon: LightningBoltIcon,
  },
];

export default function Home(props) {
  let user = props.loggedUser;
  return (
    <>
      <div className="bg-gray-900">
        <div className="max-w-7xl mx-auto py-16  sm:py-24 lg:px-8">
          <div className="text-center">
            <p className=" text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              Toma el control, apoya el comercio local
            </p>
            <h2 className="mt-6 text-base font-semibold text-green-600 tracking-wide uppercase">
              Comercio de cercania
            </h2>
            <img
              className="hidden lg:block h-32 w-auto mx-auto mt-2"
              src={LogoWhite}
              alt="Workflow"
            />
            <p className="max-w-xl mt-5 mx-auto text-xl text-white">
              Empieza a comprar productos frescos, de las tiendas de tu barrio,
              donde tus padres iban a comprar cuando eras pequeño.
            </p>
          </div>
          <div className="relative w-full h-64 sm:h-72 md:h-96 mt-8 lg:h-96">
            <img
              className="relative inset-0 w-full h-full object-cover lg:rounded-2xl"
              src={HeaderPhoto}
            />
          </div>
        </div>
      </div>

      <div className="relative bg-gray-900">
        <div className="lg:relative">
          <div className="mx-auto max-w-7xl w-full lg:pt-16 pb-20 text-center lg:py-48 lg:text-left">
            <div className="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                <span className="block xl:inline">Productos de cercanía </span>{" "}
                <span className="block text-green-500 xl:inline">
                  en la puerta de al lado
                </span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-lg text-white sm:text-xl md:mt-5 md:max-w-3xl">
                Adquiere los productos más naturales en menos de dos días en la
                puerta de tu casa o únete a nosotros como vendedor.
              </p>
              <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link
                    to="/products"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10"
                  >
                    ¡Compremos!
                  </Link>
                </div>
                {!user && (
                  <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                    <Link
                      to="/signUp"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-green-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                    >
                      ¡Unete!
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="relative w-full h-64 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full">
            <img
              className="relative inset-0 w-full h-full object-cover rounded-tl-lg"
              src={HomeFarmer}
            />
          </div>
        </div>
      </div>

      <div className="relative bg-gray-900 mb-4">
        <div className="lg:h-56 bg-white-600 lg:absolute lg:left-0 lg:h-full lg:w-1/2">
          <img
            className="w-full h-full object-cover hidden lg:flex rounded-br-lg"
            src={HomeTruck}
            alt="Support team"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-8 sm:py-12 sm:px-6 lg:py-16">
          <div className="max-w-2xl mx-auto lg:max-w-none lg:mr-0 lg:ml-auto lg:w-1/2 lg:pl-10">
            <div>
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                <UsersIcon className="h-6 w-6" aria-hidden="true" />
              </div>
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-white sm:text-4xl">
              <span className="block text-green-500 xl:inline">
                Enviando a tiempo
              </span>{" "}
              <span className="block  xl:inline">
                todos los productos que nuestros clientes necesitan.
              </span>
            </h2>
            <p className="mt-6 text-lg text-white">
              Productos frescos, naturales y ecológicos de vendedores cercanos a
              tu casa con precios competitivos y acordes al mercado,lo que
              nuestros clientes demandan.
            </p>
            <div className="mt-8 overflow-hidden">
              <dl className="-mx-8 -mt-8 flex flex-wrap">
                <div className="flex flex-col px-8 pt-8">
                  <dt className="order-2 text-base font-medium text-white">
                    Envios
                  </dt>
                  <dd className="order-1 text-2xl font-extrabold text-green-500 sm:text-3xl">
                    24/7
                  </dd>
                </div>
                <div className="flex flex-col px-8 pt-8">
                  <dt className="order-2 text-base font-medium text-white">
                    Satisfacción
                  </dt>
                  <dd className="order-1 text-2xl font-extrabold text-green-500 sm:text-3xl">
                    99.9%
                  </dd>
                </div>
                <div className="flex flex-col px-8 pt-8">
                  <dt className="order-2 text-base font-medium text-white">
                    Usuarios
                  </dt>
                  <dd className="order-1 text-2xl font-extrabold text-green-500 sm:text-3xl">
                    +500
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-green-700 lg:mb-4">
        <div className="max-w-7xl mx-auto md:grid md:grid-cols-2 md:px-6 lg:px-8">
          <div className="py-12 px-4 sm:px-6 md:flex md:flex-col md:py-16 md:pl-0 md:pr-10 md:border-r md:border-green-900 lg:pr-16">
            <div className="md:flex-shrink-0">
              <img className="h-16" src={LogoWhite} alt="Tuple" />
            </div>
            <blockquote className="mt-6 md:flex-grow md:flex md:flex-col">
              <div className="relative text-lg font-medium text-white md:flex-grow">
                <svg
                  className="absolute top-0 left-0 transform -translate-x-3 -translate-y-2 h-8 w-8 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="relative">
                  Esta idea empezó como un proyecto en Ironhack, a día de hoy,ya
                  ayudamos a más de 500 vendedores. Este es el inicio de una
                  nueva generación para el comercio de cercanía.
                </p>
              </div>
              <footer className="mt-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 inline-flex rounded-full border-2 border-white">
                    <img className="h-12 w-12 rounded-full" src={Dani} alt="" />
                  </div>
                  <div className="ml-4">
                    <div className="text-base font-medium text-white">
                      Daniel Villacañas
                    </div>
                    <div className="text-base font-medium text-green-200">
                      CEO & Co-Founder, NextDoor
                    </div>
                  </div>
                </div>
              </footer>
            </blockquote>
          </div>
          <div className="py-12 px-4 border-t-2 border-green-900 sm:px-6 md:py-16 md:pr-0 md:pl-10 md:border-t-0 md:border-l lg:pl-16">
            <div className="md:flex-shrink-0">
              <img className="h-16" src={LogoWhite} alt="Workcation" />
            </div>
            <blockquote className="mt-6 md:flex-grow md:flex md:flex-col">
              <div className="relative text-lg font-medium text-white md:flex-grow">
                <svg
                  className="absolute top-0 left-0 transform -translate-x-3 -translate-y-2 h-8 w-8 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="relative">
                  Nos juntamos, decidimos la idea que queríamos hacer y nos
                  pusímos a ello. Ahora, muchos de nuestros clientes nos
                  escriben para agradecernos la iniciativa, y esto solo acaba de
                  empezar.
                </p>
              </div>
              <footer className="mt-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 inline-flex rounded-full border-2 border-white">
                    <img
                      className="h-12 w-12 rounded-full"
                      src={Alvaro}
                      alt=""
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-base font-medium text-white">
                      Álvaro Terán
                    </div>
                    <div className="text-base font-medium text-green-200">
                      CEO & Co-Founder, NextDoor
                    </div>
                  </div>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      <div className="py-12 bg-gray-900">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only text-white">A better way to send money.</h2>
          <dl className="space-y-10 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
            {features.map((feature) => (
              <div key={feature.name}>
                <dt>
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="mt-5 text-lg leading-6 font-medium text-green-500">
                    {feature.name}
                  </p>
                </dt>
                <dd className="mt-2 text-base text-white">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </>
  );
}

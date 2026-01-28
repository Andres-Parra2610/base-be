/* import { City } from 'src/shared/entities/city.entity';
import { State } from 'src/shared/entities/state.entity'; */
import { DataSource } from 'typeorm';

const citiesByState = {
  'Amazonas': ['Maroa', 'Puerto Ayacucho', 'San Fernando de Atabapo'],
  'Anzoátegui': ['Anaco', 'Aragua de Barcelona', 'Barcelona', 'Boca de Uchire', 'Cantaura', 'Clarines', 'El Chaparro', 'El Pao Anzoátegui', 'El Tigre', 'El Tigrito', 'Guanape', 'Guanta', 'Lechería', 'Onoto', 'Pariaguán', 'Píritu', 'Puerto La Cruz', 'Puerto Píritu', 'Sabana de Uchire', 'San Mateo Anzoátegui', 'San Pablo Anzoátegui', 'San Tomé', 'Santa Ana de Anzoátegui', 'Santa Fe Anzoátegui', 'Santa Rosa', 'Soledad', 'Urica', 'Valle de Guanape'],
  'Apure': ['Achaguas', 'Biruaca', 'Bruzual', 'El Amparo', 'El Nula', 'Elorza', 'Guasdualito', 'Mantecal', 'Puerto Páez', 'San Fernando de Apure', 'San Juan de Payara'],
  'Aragua': ['Barbacoas', 'Cagua', 'Camatagua', 'Choroní', 'Colonia Tovar', 'El Consejo', 'La Victoria', 'Las Tejerías', 'Magdaleno', 'Maracay', 'Ocumare de La Costa', 'Palo Negro', 'San Casimiro', 'San Mateo', 'San Sebastián', 'Santa Cruz de Aragua', 'Tocorón', 'Turmero', 'Villa de Cura', 'Zuata'],
  'Barinas': ['Barinas', 'Barinitas', 'Barrancas', 'Calderas', 'Capitanejo', 'Ciudad Bolivia', 'El Cantón', 'Las Veguitas', 'Libertad de Barinas', 'Sabaneta', 'Santa Bárbara de Barinas', 'Socopó'],
  'Bolívar': ['Caicara del Orinoco', 'Canaima', 'Ciudad Bolívar', 'Ciudad Piar', 'El Callao', 'El Dorado', 'El Manteco', 'El Palmar', 'El Pao', 'Guasipati', 'Guri', 'La Paragua', 'Matanzas', 'Puerto Ordaz', 'San Félix', 'Santa Elena de Uairén', 'Tumeremo', 'Unare', 'Upata'],
  'Carabobo': ['Bejuma', 'Belén', 'Campo de Carabobo', 'Canoabo', 'Central Tacarigua', 'Chirgua', 'Ciudad Alianza', 'El Palito', 'Guacara', 'Guigue', 'Las Trincheras', 'Los Guayos', 'Mariara', 'Miranda', 'Montalbán', 'Morón', 'Naguanagua', 'Puerto Cabello', 'San Joaquín', 'Tocuyito', 'Urama', 'Valencia', 'Vigirimita'],
  'Cojedes': ['Aguirre', 'Apartaderos Cojedes', 'Arismendi', 'Camuriquito', 'El Baúl', 'El Limón', 'El Pao Cojedes', 'El Socorro', 'La Aguadita', 'Las Vegas', 'Libertad de Cojedes', 'Mapuey', 'Piñedo', 'Samancito', 'San Carlos', 'Sucre', 'Tinaco', 'Tinaquillo', 'Vallecito'],
  'Delta Amacuro': ['Tucupita'],
  'Falcón': ['Adícora', 'Boca de Aroa', 'Cabure', 'Capadare', 'Capatárida', 'Chichiriviche', 'Churuguara', 'Coro', 'Cumarebo', 'Dabajuro', 'Judibana', 'La Cruz de Taratara', 'La Vela de Coro', 'Los Taques', 'Maparari', 'Mene de Mauroa', 'Mirimire', 'Pedregal', 'Píritu Falcón', 'Pueblo Nuevo Falcón', 'Puerto Cumarebo', 'Punta Cardón', 'Punto Fijo', 'San Juan de Los Cayos', 'San Luis', 'Santa Ana Falcón', 'Santa Cruz De Bucaral', 'Tocopero', 'Tocuyo de La Costa', 'Tucacas', 'Yaracal'],
  'Guárico': ['Altagracia de Orituco', 'Cabruta', 'Calabozo', 'Camaguán', 'Chaguaramas Guárico', 'El Socorro', 'El Sombrero', 'Las Mercedes de Los Llanos', 'Lezama', 'Onoto', 'Ortíz', 'San José de Guaribe', 'San Juan de Los Morros', 'San Rafael de Laya', 'Santa María de Ipire', 'Tucupido', 'Valle de La Pascua', 'Zaraza'],
  'Lara': ['Aguada Grande', 'Acarigua', 'Barquisimeto', 'Bobare', 'Cabudare', 'Carora', 'Cubiro', 'Cují', 'Duaca', 'El Manzano', 'El Tocuyo', 'Guaríco', 'Humocaro Alto', 'Humocaro Bajo', 'La Miel', 'Moroturo', 'Quíbor', 'Río Claro', 'Sanare', 'Santa Inés', 'Sarare', 'Siquisique', 'Tintorero'],
  'Mérida': ['Apartaderos Mérida', 'Arapuey', 'Bailadores', 'Caja Seca', 'Canaguá', 'Chachopo', 'Chiguara', 'Ejido', 'El Vigía', 'La Azulita', 'La Playa', 'Lagunillas Mérida', 'Mérida', 'Mesa de Bolívar', 'Mucuchíes', 'Mucujepe', 'Mucuruba', 'Nueva Bolivia', 'Palmarito', 'Pueblo Llano', 'Santa Cruz de Mora', 'Santa Elena de Arenales', 'Santo Domingo', 'Tabáy', 'Timotes', 'Torondoy', 'Tovar', 'Tucani', 'Zea'],
  'Miranda': ['Araguita', 'Carrizal', 'Caucagua', 'Chaguaramas Miranda', 'Charallave', 'Chirimena', 'Chuspa', 'Cúa', 'Cupira', 'Curiepe', 'El Guapo', 'El Jarillo', 'Filas de Mariche', 'Guarenas', 'Guatire', 'Higuerote', 'Los Anaucos', 'Los Teques', 'Ocumare del Tuy', 'Panaquire', 'Paracotos', 'Río Chico', 'San Antonio de Los Altos', 'San Diego de Los Altos', 'San Fernando del Guapo', 'San Francisco de Yare', 'San José de Los Altos', 'San José de Río Chico', 'San Pedro de Los Altos', 'Santa Lucía', 'Santa Teresa', 'Tacarigua de La Laguna', 'Tacarigua de Mamporal', 'Tácata', 'Turumo'],
  'Monagas': ['Aguasay', 'Aragua de Maturín', 'Barrancas del Orinoco', 'Caicara de Maturín', 'Caripe', 'Caripito', 'Chaguaramal', 'Chaguaramas Monagas', 'El Furrial', 'El Tejero', 'Jusepín', 'La Toscana', 'Maturín', 'Miraflores', 'Punta de Mata', 'Quiriquire', 'San Antonio de Maturín', 'San Vicente Monagas', 'Santa Bárbara', 'Temblador', 'Teresen', 'Uracoa'],
  'Nueva Esparta': ['Altagracia', 'Boca de Pozo', 'Boca de Río', 'El Espinal', 'El Valle del Espíritu Santo', 'El Yaque', 'Juangriego', 'La Asunción', 'La Guardia', 'Pampatar', 'Porlamar', 'Puerto Fermín', 'Punta de Piedras', 'San Francisco de Macanao', 'San Juan Bautista', 'San Pedro de Coche', 'Santa Ana de Nueva Esparta', 'Villa Rosa'],
  'Portuguesa': ['Acarigua', 'Agua Blanca', 'Araure', 'Biscucuy', 'Boconoito', 'Campo Elías', 'Chabasquén', 'Guanare', 'Guanarito', 'La Aparición', 'La Misión', 'Mesa de Cavacas', 'Ospino', 'Papelón', 'Payara', 'Pimpinela', 'Píritu de Portuguesa', 'San Rafael de Onoto', 'Santa Rosalía', 'Turén'],
  'Sucre': ['Altos de Sucre', 'Araya', 'Cariaco', 'Carúpano', 'Casanay', 'Cumaná', 'Cumanacoa', 'El Morro Puerto Santo', 'El Pilar', 'El Poblado', 'Guaca', 'Guiria', 'Irapa', 'Manicuare', 'Mariguitar', 'Río Caribe', 'San Antonio del Golfo', 'San José de Aerocuar', 'San Vicente de Sucre', 'Santa Fe de Sucre', 'Tunapuy', 'Yaguaraparo', 'Yoco'],
  'Táchira': ['Abejales', 'Borota', 'Bramon', 'Capacho', 'Colón', 'Coloncito', 'Cordero', 'El Cobre', 'El Pinal', 'Independencia', 'La Fría', 'La Grita', 'La Pedrera', 'La Tendida', 'Las Delicias', 'Las Hernández', 'Lobatera', 'Michelena', 'Palmira', 'Pregonero', 'Queniquea', 'Rubio', 'San Antonio del Tachira', 'San Cristobal', 'San José de Bolívar', 'San Josecito', 'San Pedro del Río', 'Santa Ana Táchira', 'Seboruco', 'Táriba', 'Umuquena', 'Ureña'],
  'Trujillo': ['Batatal', 'Betijoque', 'Boconó', 'Carache', 'Chejende', 'Cuicas', 'El Dividive', 'El Jaguito', 'Escuque', 'Isnotú', 'Jajó', 'La Ceiba', 'La Concepción de Trujllo', 'La Mesa de Esnujaque', 'La Puerta', 'La Quebrada', 'Mendoza Fría', 'Meseta de Chimpire', 'Monay', 'Motatán', 'Pampán', 'Pampanito', 'Sabana de Mendoza', 'San Lázaro', 'Santa Ana de Trujillo', 'Tostós', 'Trujillo', 'Valera'],
  'La Guaira': ['Carayaca', 'Litoral', 'La Guaira', 'Catia La Mar', 'Macuto', 'Naiguatá'],
  'Yaracuy': ['Aroa', 'Boraure', 'Campo Elías de Yaracuy', 'Chivacoa', 'Cocorote', 'Farriar', 'Guama', 'Marín', 'Nirgua', 'Sabana de Parra', 'Salom', 'San Felipe', 'San Pablo de Yaracuy', 'Urachiche', 'Yaritagua', 'Yumare'],
  'Zulia': ['Bachaquero', 'Bobures', 'Cabimas', 'Campo Concepción', 'Campo Mara', 'Campo Rojo', 'Carrasquero', 'Casigua', 'Chiquinquirá', 'Ciudad Ojeda', 'El Batey', 'El Carmelo', 'El Chivo', 'El Guayabo', 'El Mene', 'El Venado', 'Encontrados', 'Gibraltar', 'Isla de Toas', 'La Concepción del Zulia', 'La Paz', 'La Sierrita', 'Lagunillas del Zulia', 'Las Piedras de Perijá', 'Los Cortijos', 'Machiques', 'Maracaibo', 'Mene Grande', 'Palmarejo', 'Paraguaipoa', 'Perijá', 'Potrerito', 'Pueblo Nuevo del Zulia', 'Puertos de Altagracia', 'Punta Gorda', 'Sabaneta de Palma', 'San Francisco', 'San José de Perijá', 'San Rafael del Moján', 'San Timoteo', 'Santa Bárbara Del Zulia', 'Santa Cruz de Mara', 'Santa Cruz del Zulia', 'Santa Rita', 'Sinamaica', 'Tamare', 'Tía Juana', 'Villa del Rosario'],
  'Distrito Capital': ['Caracas', 'El Junquito'],
  'Dependencias Federales': ['Archipiélago Los Roques', 'Archipiélago Los Monjes', 'Isla La Tortuga y Cayos adyacentes', 'Isla La Sola', 'Islas Los Testigos', 'Islas Los Frailes', 'Isla La Orchila', 'Archipiélago Las Aves', 'Isla de Aves', 'Isla La Blanquilla', 'Isla de Patos', 'Islas Los Hermanos']
};

export const citySeeder = async (source: DataSource) => {
  /* const stateRepo = source.getRepository(State);
  const cityRepo = source.getRepository(City);

  await cityRepo.deleteAll()

  const stated = await stateRepo.find();
  const stateMap = new Map<string, string>();
  stated.forEach(state => stateMap.set(state.name, state.id));

  const missingStates: string[] = [];

  const allCities = Object.entries(citiesByState).flatMap(([state, cities]) => {
    const stateId = stateMap.get(state);
    if (!stateId) {
      missingStates.push(state);
      return [];
    }

    return cities.map(cityName => ({
      name: cityName,
      stateId,
    }));
  });

  if (missingStates.length > 0) {
    console.warn('\x1b[33m%s\x1b[0m', '⚠️ Estados no encontrados (revisar nombres en DB):');
    missingStates.forEach(state => console.warn(`- ${state}`));
  }

  await cityRepo.insert(allCities); */
};

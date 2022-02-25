import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";
import { ModalNuevoGasto } from "./components/ModalNuevoGasto";
import ListadoDeGastos from "./components/ListadoDeGastos";
import { generarIdentificador } from "./helpers/generarIdentificador";
import { formateadorDeFecha } from "./helpers/formateadorDeFecha";

function App() {
	const [presupuesto, setPresupuesto] = useState(0);
	const [esPresupuestoValido, setEsPresupuestoValido] = useState(false);
	const [modalNuevoGasto, setModalNuevoGasto] = useState(false);
	const [animarModal, setAnimarModal] = useState(false);
	const [todosLosGastos, setTodosLosGastos] = useState([]);
	const [gastoAEditar, setGastoAEditar] = useState({});

	const handleNuevoGasto = () => {
		setModalNuevoGasto(true);
		setGastoAEditar({});

		setTimeout(() => {
			setAnimarModal(true);
		}, 300);
	};

	const guardarNuevoGasto = (datosDelNuevoGasto) => {
		if (datosDelNuevoGasto.id) {
			const gastosActualizados = todosLosGastos.map((gastoDelState) =>
				gastoDelState.id === datosDelNuevoGasto.id
					? datosDelNuevoGasto
					: gastoDelState
			);
			setTodosLosGastos(gastosActualizados);
			setGastoAEditar({});
		} else {
			datosDelNuevoGasto.id = generarIdentificador();
			datosDelNuevoGasto.fecha = formateadorDeFecha();
			setTodosLosGastos([...todosLosGastos, datosDelNuevoGasto]);
		}

		setAnimarModal(false);

		setTimeout(() => {
			setModalNuevoGasto(false);
		}, 300);
	};

	const eliminarGasto = (id) => {
		const gastosActualizados = todosLosGastos.filter(
			(gastoDelState) => gastoDelState.id !== id
		);
		setTodosLosGastos(gastosActualizados);
	};

	useEffect(() => {
		// Si el objeto gasto a editar está presente
		if (Object.keys(gastoAEditar).length > 0) {
			// Llamamos al modal
			setModalNuevoGasto(true);

			setTimeout(() => {
				setAnimarModal(true);
			}, 300);
		}
	}, [gastoAEditar]);

	return (
		<div className={modalNuevoGasto ? "fijar" : ""}>
			<Header
				todosLosGastos={todosLosGastos}
				presupuesto={presupuesto}
				setPresupuesto={setPresupuesto}
				esPresupuestoValido={esPresupuestoValido}
				setEsPresupuestoValido={setEsPresupuestoValido}
			/>

			{esPresupuestoValido && (
				<>
					<main>
						<ListadoDeGastos
							todosLosGastos={todosLosGastos}
							setGastoAEditar={setGastoAEditar}
							eliminarGasto={eliminarGasto}
						/>
					</main>
					<div className="nuevo-gasto">
						<img
							alt="Nuevo gasto"
							src={IconoNuevoGasto}
							onClick={handleNuevoGasto}
						/>
					</div>
				</>
			)}

			{modalNuevoGasto && (
				<ModalNuevoGasto
					setModalNuevoGasto={setModalNuevoGasto}
					animarModal={animarModal}
					setAnimarModal={setAnimarModal}
					guardarNuevoGasto={guardarNuevoGasto}
					gastoAEditar={gastoAEditar}
					setGastoAEditar={setGastoAEditar}
				/>
			)}
		</div>
	);
}

export default App;

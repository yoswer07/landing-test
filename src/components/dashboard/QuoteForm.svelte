<script lang="ts">
	export let formInfo: any;
	export let onSubmit: () => void;

	const serviceOptions = [
		'Almacenamiento',
		'Picking & Packing',
		'Gestión de Devoluciones',
		'Etiquetado',
		'Fulfillment Completo'
	];
</script>

<div class="bg-white rounded-xl shadow-md p-8">
	<h2 class="text-xl font-bold mb-6 text-secondary">Nueva Cotización Logística</h2>
	<form on:submit|preventDefault={onSubmit} class="space-y-6">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4 border-b pb-6">
			<div>
				<label for="firstName" class="input-name">Nombre</label>
				<input
					id="firstName"
					type="text"
					bind:value={formInfo.firstName}
					required
					class="input-field"
				/>
			</div>
			<div>
				<label for="lastName" class="input-name">Apellido</label>
				<input
					id="lastName"
					type="text"
					bind:value={formInfo.lastName}
					required
					class="input-field"
				/>
			</div>
			<div>
				<label for="email" class="input-name">Correo</label>
				<input id="email" type="email" bind:value={formInfo.email} required class="input-field" />
			</div>
			<div>
				<label for="phone" class="input-name">Teléfono</label>
				<input id="phone" type="text" bind:value={formInfo.phone} required class="input-field" />
			</div>
		</div>

		<div class="space-y-4">
			<div>
				<label for="type" class="input-name">Tipo de Producto</label>
				<input
					id="type"
					type="text"
					bind:value={formInfo.productType}
					placeholder="Especifique que tipo de producto enviara"
					required
					class="input-field"
				/>
			</div>

			<div>
				<label for="quantity" class="input-name">Cantidad aproximada por mes</label>
				<select id="quantity" bind:value={formInfo.monthlyQuantity} class="input-field">
					<option value="1-50">1 - 50 pedidos</option>
					<option value="51-200">51 - 200 pedidos</option>
					<option value="201-500">201 - 500 pedidos</option>
					<option value="500+">Más de 500 pedidos</option>
				</select>
			</div>

			<div>
				<p class="input-name pb-2">Servicios requeridos</p>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-2">
					{#each serviceOptions as service, i}
						<label class="flex items-center space-x-2 text-sm cursor-pointer group">
							<input
								id="service-{i}"
								type="checkbox"
								bind:group={formInfo.services}
								value={service}
								class="checkbox-field"
							/>
							<span class="group-hover:text-primary transition-colors">{service}</span>
						</label>
					{/each}
				</div>
			</div>
			<div class="grid grid-cols-2 gap-4">
				<div>
					<label for="weigth" class="input-name">Peso Promedio (LB)</label>
					<input
						id="weigth"
						type="number"
						bind:value={formInfo.avgWeight}
						placeholder="lb"
						class="input-field"
					/>
				</div>
				<div>
					<label for="heigth" class="input-name">Tamaño Promedio (IN)</label>
					<input
						id="heigth"
						type="text"
						bind:value={formInfo.avgSize}
						placeholder="10x10x10 in"
						class="input-field"
					/>
				</div>
			</div>

			<div>
				<p class="input-name pb-2">Preferencia de Envío</p>

				<div class="flex space-x-6">
					<label class="flex items-center space-x-2 text-sm cursor-pointer group">
						<input
							type="radio"
							bind:group={formInfo.shippingType}
							value="Same Day"
							class="radio-field"
						/>
						<span class="group-hover:text-primary transition-colors">Same Day</span>
					</label>

					<label class="flex items-center space-x-2 text-sm cursor-pointer group">
						<input
							type="radio"
							bind:group={formInfo.shippingType}
							value="Standard"
							class="radio-field"
						/>
						<span class="group-hover:text-primary transition-colors">Standard</span>
					</label>
				</div>
			</div>
		</div>

		<button
			type="submit"
			class="btn-primary"
		>
			ENVIAR COTIZACIÓN
		</button>
	</form>
</div>

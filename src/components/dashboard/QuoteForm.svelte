<script lang="ts">
	export let formInfo: any;
	export let onSubmit: () => void;
	import { t } from '$lib/langStore';

	$: serviceOptions = [
		$t.storage_quote,
		'Picking & Packing',
		$t.refund_quote,
		$t.label_quote,
		'Fulfillment'
	];
</script>

<div class="bg-white rounded-xl shadow-md p-8">
	<h2 class="text-xl font-bold mb-6 text-secondary">{$t.title_quote}</h2>
	<form on:submit|preventDefault={onSubmit} class="space-y-6">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4 border-b pb-6">
			<div>
				<label for="firstName" class="input-name">{$t.name_quote}</label>
				<input
					id="firstName"
					type="text"
					bind:value={formInfo.firstName}
					required
					class="input-field"
				/>
			</div>
			<div>
				<label for="lastName" class="input-name">{$t.lastname_quote}</label>
				<input
					id="lastName"
					type="text"
					bind:value={formInfo.lastName}
					required
					class="input-field"
				/>
			</div>
			<div>
				<label for="email" class="input-name">{$t.email_quote}</label>
				<input id="email" type="email" bind:value={formInfo.email} required class="input-field" />
			</div>
			<div>
				<label for="phone" class="input-name">{$t.phone_quote}</label>
				<input id="phone" type="text" bind:value={formInfo.phone} required class="input-field" />
			</div>
		</div>

		<div class="space-y-4">
			<div>
				<label for="type" class="input-name">{$t.product_quote}</label>
				<input
					id="type"
					type="text"
					bind:value={formInfo.productType}
					placeholder={$t.productplace_quote}
					required
					class="input-field"
				/>
			</div>

			<div>
				<label for="quantity" class="input-name">{$t.quantity_quote}</label>
				<select id="quantity" bind:value={formInfo.monthlyQuantity} class="input-field">
					<option value="1-50">1 - 50 {$t.orders_quote}</option>
					<option value="51-200">51 - 200 {$t.orders_quote}</option>
					<option value="201-500">201 - 500 {$t.orders_quote}</option>
					<option value="500+">+500 {$t.orders_quote}</option>
				</select>
			</div>

			<div>
				<p class="input-name pb-2">{$t.services_quote}</p>

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
					<label for="weigth" class="input-name">{$t.weight_quote} (LB)</label>
					<input
						id="weigth"
						type="number"
						bind:value={formInfo.avgWeight}
						placeholder="lb"
						class="input-field"
					/>
				</div>
				<div>
					<label for="heigth" class="input-name">{$t.size_quote} (IN)</label>
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
				<p class="input-name pb-2">{$t.ship_quote}</p>

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
			{$t.btnsend_quote}
		</button>
	</form>
</div>

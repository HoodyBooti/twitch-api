import { Enumerable } from '@d-fischer/shared-utils';
import { ApiClient } from '../../ApiClient';

/** @private */
export interface SubscriptionData {
	_id: string;
	sub_plan: string;
	sub_plan_name: string;
	created_at: string;
}

/**
 * A subscription to a Twitch channel.
 */
export class Subscription {
	/** @private */
	@Enumerable(false) protected readonly _client: ApiClient;

	/** @private */
	constructor(/** @private */ protected _data: SubscriptionData, client: ApiClient) {
		this._client = client;
	}

	/**
	 * The ID of the subscription.
	 */
	get id() {
		return this._data._id;
	}

	/**
	 * The identifier of the subscription plan.
	 */
	get subPlan() {
		return this._data.sub_plan;
	}

	/**
	 * The name of the subscription plan.
	 */
	get subPlanName() {
		return this._data.sub_plan_name;
	}

	/**
	 * The date when the subscription was started.
	 */
	get startDate() {
		return new Date(this._data.created_at);
	}
}

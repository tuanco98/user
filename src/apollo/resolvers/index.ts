import { pr_user_box_histories_get } from "./Queries/boxes/pr_user_boxes_histories_get";
import { pr_user_invetory_para_arts_get } from "./Queries/paraarts/pr_user_invetory_para_arts_get";
import { pr_user_invetory_para_art_detail_get } from "./Queries/paraarts/pr_user_invetory_para_art_detail_get";
import { pr_user_invetory_runepacks_get } from "./Queries/rune_packs/pr_user_invetory_runepacks_get";
import { pr_user_invetory_runepack_detail_get } from "./Queries/rune_packs/pr_user_invetory_runepack_detail_get";
import { pr_user_mybid_para_arts_get } from "./Queries/paraarts/pr_user_mybid_para_arts_get";
import { pr_user_mybid_runepacks_get } from "./Queries/rune_packs/pr_user_mybid_runepacks_get";
import { pr_user_mylist_purchased_statistic } from "./Queries/pr_user_mylist_purchased_statistic";
import { pr_user_myorder_para_arts_get } from "./Queries/paraarts/pr_user_myorder_para_arts_get";
import { pr_user_myorder_runepacks_get } from "./Queries/rune_packs/pr_user_myorder_runepacks_get";
import { pr_user_my_bid_boxes_get } from "./Queries/boxes/pr_user_my_bid_boxes_get";
import { pr_user_my_boxes_get } from "./Queries/boxes/pr_user_my_boxes_get";
import { pr_user_my_order_boxes_get } from "./Queries/boxes/pr_user_my_order_boxes_get";
import { pr_user_box_history_statistic_get } from "./Queries/boxes/pr_user_box_history_statistic_get";
import { pr_user_my_bid_para_art_rents_get } from "./Queries/paraarts/pr_user_my_bid_para_art_rents_get";
import { pr_user_my_order_para_art_rents_get } from "./Queries/paraarts/pr_user_my_order_para_art_rents_get";
import { pr_user_invetory_paragons_get } from "./Queries/paragons/pr_user_invetory_paragons_get";
import { pr_user_invetory_paragon_detail_get } from "./Queries/paragons/pr_user_invetory_paragon_detail_get";
import { pr_user_my_uncraft_paragon_detail_get } from "./Queries/paragons/pr_user_my_uncraft_paragon_detail_get";
import { pr_user_my_uncraft_paragon_histories_get } from "./Queries/paragons/pr_user_my_uncraft_paragon_histories_get";
import { pr_user_my_orders_paragon_get } from "./Queries/paragons/pr_user_my_orders_paragon_get";
import { pr_user_my_bids_paragon_get } from "./Queries/paragons/pr_user_my_bids_paragon_get";
import { pr_user_update_energy_paragon } from "./Mutations/paragons/pr_user_update_energy_paragon";
import { pr_user_update_energy_histories_get } from "./Queries/paragons/pr_user_update_energy_histories_get";
import { pr_user_refill_energy_get } from "./Queries/paragons/pr_user_refill_energy_get";
import { pr_user_update_refill_energy } from "./Mutations/paragons/pr_user_update_refill_energy";
import { pr_user_submit_username } from "./Mutations/accounts/pr_user_submit_username";
import { pr_user_skip_submit_username } from "./Mutations/accounts/pr_user_skip_submit_username";
import { pr_user_account_get } from "./Queries/accounts/pr_user_account_get";
import { VERSION_API } from "../../version";
import { pr_user_paragons_get } from "./Queries/paragons/pr_user_paragons_get";
import { pr_user_campaign_rewards_get } from "./Queries/campaigns/pr_user_campaign_rewards_get";
import { pr_user_campaign_claim_reward } from "./Mutations/campaigns/pr_user_campaign_claim_reward";
import { pr_user_admin_update_refill_energy } from "./Mutations/admins/pr_user_admin_update_refill_energy";

const resolvers = {
    Mutation: {
        pr_user_update_energy_paragon,
        pr_user_update_refill_energy,

        pr_user_submit_username,
        pr_user_skip_submit_username,

        pr_user_campaign_claim_reward,

        pr_user_admin_update_refill_energy,
    },
    Query: {
        pr_user_version_api_get: () => VERSION_API,

        pr_user_invetory_runepack_detail_get,
        pr_user_invetory_runepacks_get,
        pr_user_mybid_runepacks_get,
        pr_user_myorder_runepacks_get,

        pr_user_invetory_para_art_detail_get,
        pr_user_invetory_para_arts_get,
        pr_user_mybid_para_arts_get,
        pr_user_myorder_para_arts_get,
        pr_user_my_bid_para_art_rents_get,
        pr_user_my_order_para_art_rents_get,
        
        pr_user_my_boxes_get,
        pr_user_box_histories_get,
        pr_user_my_bid_boxes_get,
        pr_user_my_order_boxes_get,
        pr_user_box_history_statistic_get,

        pr_user_invetory_paragons_get,
        pr_user_invetory_paragon_detail_get,
        pr_user_my_orders_paragon_get,
        pr_user_my_bids_paragon_get,
        pr_user_my_uncraft_paragon_detail_get,
        pr_user_my_uncraft_paragon_histories_get,
        pr_user_update_energy_histories_get,
        pr_user_refill_energy_get,
        pr_user_paragons_get,

        pr_user_account_get,

        pr_user_mylist_purchased_statistic,

        pr_user_campaign_rewards_get,
    }
};
export { resolvers };

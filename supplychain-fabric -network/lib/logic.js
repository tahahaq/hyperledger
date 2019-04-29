/* eslint-disable require-jsdoc */
'use strict';


// Here we define the transactions

const namespace = 'one.timber.supplychain';

/**
 * Change owner transaction
 * @param {one.timber.supplychain.transfer_timber} tx - transfer_timber
 * @transaction
 */
async function transfer_timber(tx) {
    let timberRegistry = await getAssetRegistry(namespace + '.Timber');
    try {
        let timber = await timberRegistry.get(tx.timber_id);
        timber.owner = tx.new_owner;
        await timberRegistry.update(timber);
    } catch (error) {
        console.error(error);
    }
}


/**
 * Change owner transaction
 * @param {one.timber.supplychain.transfer_wood} tx - transfer_wood
 * @transaction
 */
async function transfer_wood(tx) {
    let woodRegistry = await getAssetRegistry(namespace + '.Wood');
    try {
        let wood = await woodRegistry.get(tx.wood_id);
        wood.owner = tx.new_owner;
        await woodRegistry.update(wood);
    } catch (error) {
        console.error(error);
    }
}

/**
 * Change owner transaction
 * @param {one.timber.supplychain.transfer_pine} tx - transfer_pine
 * @transaction
 */
async function transfer_pine(tx) {
    let pineRegistry = await getAssetRegistry(namespace + '.Pine');
    try {
        let pine = await pineRegistry.get(tx.pine_id);
        pine.owner = tx.new_owner;
        await pineRegistry.update(pine);
    } catch (error) {
        console.error(error);
    }
}



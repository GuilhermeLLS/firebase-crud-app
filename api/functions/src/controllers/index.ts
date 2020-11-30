import db from "../database/index";
import { Request, Response } from "express";

interface ItemType {
  id: string;
  item: string;
}

async function createItem(req: Request, res: Response) {
  const newItem = await db
    .collection("items")
    .doc(`/${req.body.id}/`)
    .create({ item: req.body.item })
    .catch((err) => console.error(err));

  if (!newItem) {
    return res.status(500).send("error on item creation");
  }
  return res.status(200).send(newItem);
}

async function readItems(_req: Request, res: Response) {
  const response: ItemType[] = [];
  await db
    .collection("items")
    .get()
    // ! bad code alert
    .then((querySnapshot) => {
      const docs = querySnapshot.docs;
      docs.forEach((doc) => {
        response.push({
          id: doc.id,
          item: doc.data().item,
        });
      });
    });
  if (!response.length) {
    return res.status(500).send("no items found");
  }
  return res.status(200).send(response);
}

async function readItem(req: Request, res: Response) {
  const item = await db.collection("items").doc(req.params.item_id).get();
  if (!item) {
    return res.status(500).send("no item found");
  }
  return res.status(200).send(item);
}

async function deleteItem(req: Request, res: Response) {
  const item = await db.collection("items").doc(req.params.item_id).delete();
  if (!item) {
    return res.status(500).send("no item found");
  }
  return res.status(200).send(item);
}

async function updateItem(req: Request, res: Response) {
  const item = await db.collection("items").doc(req.params.item_id).update({
    item: req.body.item,
  });
  if (!item) {
    return res.status(500).send("no item found");
  }
  return res.status(200).send(item);
}

export { createItem, readItems, readItem, deleteItem, updateItem };

import express from'express';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
const PORT = 3000;


app.get('/image/:folder', async (req, res) => {
    const {data: files, error} = await supabase.storage.from('image')
  .list(req.params.folder, { limit: 100 });
    if (error) {
        return res.status(404).send(error);
    }
    const fileWithUrls = files.map(file => {
        const {data} = supabase.storage.from('image').getPublicUrl(`${req.params.folder}/${file.name}`);
        return {
            id: file.id,
            name: file.name,
            url: data.publicUrl         
        }
    })
    res.send(fileWithUrls);
});

app.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('Product')
    .select('*');

  if (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }

  if (!data || data.length === 0) {
    return res.status(404).send('Data not found');
  }

  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
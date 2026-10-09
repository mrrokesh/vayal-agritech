INSERT INTO products (slug, name_en, name_ta, price, mrp, sort_order) VALUES
  ('kit',  'Vayal Kit',  'வயல் கிட்',  8999, 9998, 1),
  ('hub',  'Vayal Hub',  'வயல் ஹப்',   5999, NULL, 2),
  ('node', 'Vayal Node', 'வயல் நோட்',  3999, NULL, 3),
  ('tag',  'Vayal Tag',  'வயல் டேக்',  1999, NULL, 4),
  ('plus', 'Vayal Plus', 'வயல் பிளஸ்',   49, NULL, 5);

INSERT INTO drone_rates (crop, name_en, name_ta, litres_per_acre, cost_per_acre) VALUES
  ('paddy',     'Paddy',     'நெல்',    10, 500),
  ('sugarcane', 'Sugarcane', 'கரும்பு', 15, 650),
  ('banana',    'Banana',    'வாழை',    15, 600),
  ('cotton',    'Cotton',    'பருத்தி', 12, 550);

INSERT INTO lots (crop_en, crop_ta, farmer_en, farmer_ta, district_en, district_ta, quantity_en, quantity_ta, quality_en, quality_ta, price, unit, buyer_type, available_en, available_ta) VALUES
  ('Ponni paddy (AWD grown)', 'பொன்னி நெல் (AWD சாகுபடி)', 'Sundaram, FPO Kumbakonam', 'சுந்தரம், FPO கும்பகோணம்', 'Thanjavur', 'தஞ்சாவூர்', '45 t', '45 டன்', 'Grade A · 14% moisture', 'தரம் A · 14% ஈரப்பதம்', 2450, 'quintal', 'B2B', 'Oct 12', 'அக் 12'),
  ('Salem turmeric finger', 'சேலம் மஞ்சள் விரலி', 'Selvi, Salem Turmeric FPC', 'செல்வி, சேலம் மஞ்சள் FPC', 'Salem', 'சேலம்', '12 t', '12 டன்', 'Curcumin 4.2%', 'குர்குமின் 4.2%', 13200, 'quintal', 'B2B', 'Ready', 'தயார்'),
  ('Nendran banana', 'நேந்திரன் வாழை', 'Ravi, Trichy', 'ரவி, திருச்சி', 'Tiruchirappalli', 'திருச்சிராப்பள்ளி', '8 t', '8 டன்', '13–15 kg bunches', '13–15 கிலோ தார்', 34, 'kg', 'B2D', 'Weekly', 'வாரந்தோறும்'),
  ('Coconut (dehusked)', 'தேங்காய் (உரித்தது)', 'Pollachi Coconut Growers', 'பொள்ளாச்சி தென்னை விவசாயிகள்', 'Coimbatore', 'கோயம்புத்தூர்', '60,000 nuts', '60,000 காய்', '550 g+ each', 'ஒவ்வொன்றும் 550 கி+', 18, 'nut', 'B2D', 'Ready', 'தயார்'),
  ('Sugarcane (CO 86032)', 'கரும்பு (CO 86032)', 'Karthik, Erode', 'கார்த்திக், ஈரோடு', 'Erode', 'ஈரோடு', '120 t', '120 டன்', 'Recovery 10.5%', 'சர்க்கரை மீட்பு 10.5%', 3150, 'tonne', 'B2B', 'Nov 3', 'நவ 3'),
  ('Small onion (sambar)', 'சின்ன வெங்காயம்', 'Lakshmi, Perambalur', 'லட்சுமி, பெரம்பலூர்', 'Perambalur', 'பெரம்பலூர்', '20 t', '20 டன்', 'Sorted, 25 mm+', 'தரம் பிரித்தது, 25 மி.மீ.+', 42, 'kg', 'B2D', 'Ready', 'தயார்'),
  ('Groundnut pods', 'நிலக்கடலை', 'Villupuram Farmers Collective', 'விழுப்புரம் விவசாயிகள் கூட்டமைப்பு', 'Villupuram', 'விழுப்புரம்', '18 t', '18 டன்', 'Bold, 70% shelling', 'பெரியது, 70% பருப்பு', 6800, 'quintal', 'B2B', 'Oct 20', 'அக் 20'),
  ('Seeraga samba rice', 'சீரக சம்பா அரிசி', 'Thiruvarur Delta FPO', 'திருவாரூர் டெல்டா FPO', 'Thiruvarur', 'திருவாரூர்', '10 t', '10 டன்', 'Aged 6 months', '6 மாதம் பழையது', 9800, 'quintal', 'B2D', 'Ready', 'தயார்');

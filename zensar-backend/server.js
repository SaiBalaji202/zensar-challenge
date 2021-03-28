const app = require('express')();

require('./startup/db')();
require('./startup/cors')(app);
require('./startup/routes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

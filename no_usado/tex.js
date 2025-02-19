const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(' postgres://postgres:1234@localhost:5432/wil') // Example for postgres

// Definir los modelos
const User = sequelize.define('User', {
  username: DataTypes.STRING,
});

const Profile = sequelize.define('Profile', {
  bio: DataTypes.TEXT,
});

const Post = sequelize.define('Post', {
  title: DataTypes.STRING,
  content: DataTypes.TEXT,
});

const Tag = sequelize.define('Tag', {
  name: DataTypes.STRING,
});

// Relaciones Uno a Uno (One-to-One)
// Un usuario tiene un perfil
User.hasOne(Profile);
Profile.belongsTo(User);

// Relaciones Uno a Muchos (One-to-Many)
// Un usuario puede tener muchos posts
User.hasMany(Post);
Post.belongsTo(User);  // Este es la contraparte de "Uno a Muchos", también puede considerarse como "Muchos a Uno"

// Relaciones Muchos a Muchos (Many-to-Many)
// Un post puede tener muchos tags, y un tag puede estar asociado a muchos posts
Post.belongsToMany(Tag, { through: 'PostTags' });
Tag.belongsToMany(Post, { through: 'PostTags' });


// fin definicion de tablas y relaciones




// Sincronizar modelos con la base de datos
sequelize.sync({ force: true }).then(async () => {
  // Crear un usuario con un perfil
  const user = await User.create({
    username: 'abin',
    Profile: {
      bio: 'Desarrollador de software.',
    },
  }, {
    include: Profile,
  });

  // Crear un post asociado a ese usuario
  const post = await Post.create({
    title: 'Mi primer post',
    content: 'Contenido del post...',
    UserId: user.id, // Asociar el post al usuario
  });

  // Crear algunos tags y asociarlos al post
  const tag1 = await Tag.create({ name: 'JavaScript' });
  const tag2 = await Tag.create({ name: 'Sequelize' });

  await post.addTags([tag1, tag2]); // Asociar los tags al post

  // Consultar el usuario con su perfil, posts, y los tags asociados a los posts
  const userData = await User.findOne({
    where: { username: 'abin' },
    include: [
      Profile,
      {
        model: Post,
        include: Tag, // Incluir también los tags asociados a los posts
      },
    ],
  });

  console.log(JSON.stringify(userData, null, 2));
});


async function sampleDb(){
  try {
    await sequelize.sync({force:true})
       sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
    
  
  }
  sampleDb()
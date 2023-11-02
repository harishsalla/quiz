
module.exports=(sequelize,DataTypes)=>{

    const Display=sequelize.define("academy",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        question_text:{
            type:DataTypes.TEXT,
        },
        question_code:{
            type:DataTypes.TEXT
        },
        question_description:{
            type:DataTypes.TEXT
        },
        first_option:{
            type:DataTypes.TEXT
        },
        second_option:{
            type:DataTypes.TEXT
        }

    },{
        tableName:"academy",
        timestamps:false
    });


    return Display

}
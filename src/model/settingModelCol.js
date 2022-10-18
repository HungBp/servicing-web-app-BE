const { DataTypes } = require("sequelize");

const locationModelCol = {
  id: {
    type: DataTypes.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  },
  value: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      notEmpty: true
    }
  }
};

const priorityModelCol = {
  id: {
    type: DataTypes.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  },
  value: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      notEmpty: true
    }
  }
};

const customerLevelModelCol = {
  id: {
    type: DataTypes.CHAR,
    unique: true,
    primaryKey: true
  },
  value: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      notEmpty: true
    }
  }
};

const serviceModeModelCol = {
  id: {
    type: DataTypes.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  },
  value: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      notEmpty: true
    }
  }
};

const servicePortfolioModelCol = {
  id: {
    type: DataTypes.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  },
  value: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      notEmpty: true
    }
  }
};

const serviceTypeModelCol = {
  id: {
    type: DataTypes.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  },
  value: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      notEmpty: true
    }
  }
};

const progressModelCol = {
  id: {
    type: DataTypes.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  },
  status: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  value: {
    type: DataTypes.INTEGER,
    validate: {
      notEmpty: true,
      min: 0,
      max: 100
    }
  }
};

const alarmModelCol = {
  id: {
    type: DataTypes.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  },
  value: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      notEmpty: true
    }
  }
};

const customerTypeModelCol = {
  id: {
    type: DataTypes.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  },
  value: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      notEmpty: true
    }
  }
};

const verticalMarketModelCol = {
  id: {
    type: DataTypes.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  },
  value: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      notEmpty: true
    }
  }
};

const typeOfServiceModelCol = {
  id: {
    type: DataTypes.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  },
  value: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  code: {
    type: DataTypes.CHAR,
    unique: true,
    validate: {
      notEmpty: true
    }
  }
};

const typeOfSupportModelCol = {
  id: {
    type: DataTypes.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  },
  value: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  code: {
    type: DataTypes.CHAR,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  complexity: {
    type: DataTypes.FLOAT,
    validate: {
      notEmpty: true,
      min: 0,
      max: 5,
      isInStep(value) {
        if (Number(value.toPrecision(2)) % 0.5 !== 0) { throw new Error("The selected value is in not step by 0.5"); }
      }
    }
  }
};

const applicationModelCol = {
  id: {
    type: DataTypes.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  },
  value: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  code: {
    type: DataTypes.CHAR,
    unique: true,
    validate: {
      notEmpty: true
    }
  }
};

const optionModelCol = {
  id: {
    type: DataTypes.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  },
  value: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  code: {
    type: DataTypes.CHAR,
    unique: true,
    validate: {
      notEmpty: true
    }
  }
};

const partnerModelCol = {
  id: {
    type: DataTypes.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  },
  value: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  code: {
    type: DataTypes.CHAR,
    unique: true,
    validate: {
      notEmpty: true
    }
  }
};

const componentModelCol = {
  id: {
    type: DataTypes.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  },
  value: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: true
    }
  },
  code: {
    type: DataTypes.INTEGER,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  applicationId: {
    type: DataTypes.INTEGER,
    validate: {
      notEmpty: true
    }
  }
};

const estimatedTimeModelCol = {
  id: {
    type: DataTypes.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  },
  componentId: {
    type: DataTypes.INTEGER,
    validate: {
      notEmpty: true
    }
  },
  typeOfSupportId: {
    type: DataTypes.INTEGER,
    validate: {
      notEmpty: true
    }
  },
  value: {
    type: DataTypes.FLOAT,
    validate: {
      notEmpty: true,
      isInStep(value) {
        if (Number(value.toPrecision(2)) % 0.5 !== 0) { throw new Error("The selected value is in not step by 0.5"); }
      }
    }
  },
  manPower: {
    type: DataTypes.INTEGER,
    validate: {
      notEmpty: true
    }
  }
};

module.exports = {
  location: locationModelCol,
  priority: priorityModelCol,
  customerLevel: customerLevelModelCol,
  serviceMode: serviceModeModelCol,
  servicePortfolio: servicePortfolioModelCol,
  serviceType: serviceTypeModelCol,
  progress: progressModelCol,
  alarm: alarmModelCol,
  customerType: customerTypeModelCol,
  verticalMarket: verticalMarketModelCol,
  typeOfService: typeOfServiceModelCol,
  typeOfSupport: typeOfSupportModelCol,
  application: applicationModelCol,
  option: optionModelCol,
  partner: partnerModelCol,
  component: componentModelCol,
  estimatedTime: estimatedTimeModelCol
};

export LevelGauge =() =>{
    return (
      <View style={styles.levelGaugeContainer}>
          <Text style={styles.levelLabel}>Level</Text>
          <View>
            <AnimatedGaugeProgress
                size={100}
                width={13}
                fill={(parseInt(this.state.currentLevel)/15 )  *100}
                rotation={180}
                cropDegree={220}
                tintColor="purple"
                backgroundColor="gray"
                stroke={[2, 2]} //For an equaly dashed line
                strokeCap="circle" >
            </AnimatedGaugeProgress>
          </View>
          <View style={styles.levelDisplay}>      
                          <AnimateNumber style={styles.levelDisplayDigit} value={ parseFloat(this.state.currentLevel).toFixed(2) } countBy={100} interval={100} /> 
                          <Text style={styles.levelDisplayUnit}> dBm </Text>
          </View>
      </View>
      ) ; 
    }
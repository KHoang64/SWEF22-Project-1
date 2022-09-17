using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class EndingTrigger : MonoBehaviour
{
    public Controller playerControllerScript;
    public Warp playerWarpScript;
    public SuperHotScript playerSuperHotScript;

    public GameObject postProfile;
    public GameObject Player;
    public GameObject endingUI;
    private void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Player"))
        {
            //Player.SetActive(false);
            playerControllerScript.enabled = false;
            playerWarpScript.gameObject.SetActive(false);
            playerSuperHotScript.gameObject.SetActive(false);
            postProfile.SetActive(true);
            endingUI.SetActive(true);
        }
    }
}
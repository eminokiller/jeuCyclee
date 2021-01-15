<?php

namespace App\Entity;

use App\Repository\CampagneRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=CampagneRepository::class)
 */
class Campagne extends EntityRef
{
    /**
     * @ORM\OneToMany(targetEntity=Task::class, mappedBy="campagne")
     */
    private $tasks;

    /**
     * @ORM\OneToMany(targetEntity=Equipe::class, mappedBy="campagne")
     */
    private $equipes;

    /**
     * @ORM\OneToMany(targetEntity=ActionMarketing::class, mappedBy="campagne")
     */
    private $actionMarketings;

    public function __construct()
    {
        $this->tasks = new ArrayCollection();
        $this->equipes = new ArrayCollection();
        $this->actionMarketings = new ArrayCollection();
    }

    /**
     * @return Collection|Task[]
     */
    public function getTasks(): Collection
    {
        return $this->tasks;
    }

    public function addTask(Task $task): self
    {
        if (!$this->tasks->contains($task)) {
            $this->tasks[] = $task;
            $task->setCampagne($this);
        }

        return $this;
    }

    public function removeTask(Task $task): self
    {
        if ($this->tasks->removeElement($task)) {
            // set the owning side to null (unless already changed)
            if ($task->getCampagne() === $this) {
                $task->setCampagne(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Equipe[]
     */
    public function getEquipes(): Collection
    {
        return $this->equipes;
    }

    public function addEquipe(Equipe $equipe): self
    {
        if (!$this->equipes->contains($equipe)) {
            $this->equipes[] = $equipe;
            $equipe->setCampagne($this);
        }

        return $this;
    }

    public function removeEquipe(Equipe $equipe): self
    {
        if ($this->equipes->removeElement($equipe)) {
            // set the owning side to null (unless already changed)
            if ($equipe->getCampagne() === $this) {
                $equipe->setCampagne(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|ActionMarketing[]
     */
    public function getActionMarketings(): Collection
    {
        return $this->actionMarketings;
    }

    public function addActionMarketing(ActionMarketing $actionMarketing): self
    {
        if (!$this->actionMarketings->contains($actionMarketing)) {
            $this->actionMarketings[] = $actionMarketing;
            $actionMarketing->setCampagne($this);
        }

        return $this;
    }

    public function removeActionMarketing(ActionMarketing $actionMarketing): self
    {
        if ($this->actionMarketings->removeElement($actionMarketing)) {
            // set the owning side to null (unless already changed)
            if ($actionMarketing->getCampagne() === $this) {
                $actionMarketing->setCampagne(null);
            }
        }

        return $this;
    }

}
